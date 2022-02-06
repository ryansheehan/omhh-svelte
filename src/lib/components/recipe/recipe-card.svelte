<script lang="ts">
  import type {IngredientGroup, RecipeData, FoodData ,BlockData, NutrientData} from '$lib/sanity';
  import { convertAmount } from '$lib/units';
  import Image from '$lib/components/sanity-image.svelte';
  import RecipeCardHeader from '$lib/components/recipe/recipe-card-header.svelte';
  import RecipeCardIngredients from '$lib/components/recipe/recipe-card-ingredients.svelte';
  import RecipeCardSteps from '$lib/components/recipe/recipe-card-steps.svelte';
  import RecipeCardNotes from '$lib/components/recipe/recipe-card-notes.svelte';
  import CarbsServed from '$lib/components/recipe/carbs-served.svelte'
  import HeartDivider from '$lib/components/heart-divider.svelte';
  import { query } from '$lib/responsive';

  export let recipe: RecipeData;
  
  let scrollToTarget: HTMLElement;
  export const scrollTo = () => scrollToTarget?.scrollIntoView({behavior: 'smooth', block: 'start'});

  function findNutrients(nutrients: NutrientData[], find: string[]) {
    const totals = new Array(find.length).fill(0);
    for(let i = 0; i < nutrients.length; i++) {
      const foundIndex = find.indexOf(nutrients[i].name);
      if (foundIndex > -1) {
        totals[foundIndex] += nutrients[i].amount;      
      }      
    }    
    return totals;
  }

  function extractGramsProductsNotes(ingredientGroups: IngredientGroup[]) {
    const ingredientGrams = new Map<string, number>();
    const ingredientProductMap = new Map<string, string>();
    const noteMap = new Map<number, BlockData>();  
    const carbMap = new Map<string, number>();  
    let totalCarbs = 0;
    let totalFiber = 0;

    ingredientGroups.forEach(group => group.ingredients.forEach(ingredient => {      
      const {isGarnish, toTaste} = ingredient;  
      const food = ingredient.food as FoodData;
      const {fdc_id, notes, nutrients} = food;

      // skip finding carbs and fiber for garnish or to-taste ingredients
      const [carbs, fiber] =  isGarnish || toTaste ?  [0, 0] : findNutrients(nutrients, ['Carbohydrate, by difference', 'Fiber, total dietary']);
      const { amount, divisor, unit, modifier} = ingredient;
      
      const grams = convertAmount({
        amount: amount / divisor,
        fromUnit: unit,
        fromModifier: modifier,
        toUnit: 'g',
        portions: food.portions,
      });      

      if (grams) {
        // nutrients are stored as per 100 grams
        // so we must take the calculated grams and divide it by 100
        const nutrientScalar = grams / 100;        
        const scaledCarbs = carbs * nutrientScalar;
        carbMap.set(ingredient._key, scaledCarbs);  

        totalCarbs += nutrientScalar * carbs;
        totalFiber += nutrientScalar * fiber;
        ingredientGrams.set(ingredient._key, grams);
      }
              
      // check to see if the food has an affiliate link
      if (food.productSuggestion && food.productSuggestion.productUrl) {          
        ingredientProductMap.set(ingredient._key, food.productSuggestion.productUrl);
      } 

      if (notes && !noteMap.has(fdc_id)) {
        noteMap.set(fdc_id, notes);
      }      
    }));

    const foodNotes: {fdcid: number, blocks: BlockData}[] = [];
    noteMap.forEach((blocks, fdcid) => foodNotes.push({fdcid, blocks}));    

    return { ingredientGrams, ingredientProductMap, foodNotes, totalCarbs, totalFiber, carbMap };
  }

  const {
    squareIGImage,
    name: title,
    description,
    author,
    publishedAt,
    tags,
    prepTime, cookTime, totalTime,
    totalWeight, totalServings, yieldUnit,
    ingredients,
    steps,
    foodScale,
  } = recipe;

  const {ingredientGrams, ingredientProductMap, foodNotes, totalCarbs, totalFiber, carbMap} = extractGramsProductsNotes(ingredients);  

  const headerProps = {
    title,
    description,
    author: author.name,
    publishDate: publishedAt ? (new Date(publishedAt)).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'}) : 'unpublished',
    dietaryTags: tags.filter(tag => tag.category === 'Dietary Restrictions').map(tag => tag.value), 
    time: {
      prep: prepTime,
      cook: cookTime,
      total: totalTime,
    },
    servings: {
      total: totalServings,
      size: Math.floor(totalWeight / totalServings),
      unit: yieldUnit,
    }, 
  }
</script>

<div class="recipe-card-wrapper">
  <div class="recipe-card-image" bind:this={scrollToTarget}>
    <Image source={squareIGImage} widths={[176, 150]} sizes={[`${query.tabletAndLarger} 200px`, '150px']} showCaption={false} />  
  </div>
  <RecipeCardHeader {...headerProps} />
  <div class="section">    
    <RecipeCardIngredients {carbMap} ingredientGroups={ingredients} {ingredientGrams} {ingredientProductMap} />
  </div>
  <div class="section">
    <RecipeCardSteps stepGroups={steps} />
  </div>
  <div class="section">
    <RecipeCardNotes notes={foodNotes} />
  </div>
  <HeartDivider />
  <div class="section">
    <CarbsServed {totalWeight} {totalServings} fiber={totalFiber} carbs={totalCarbs} {foodScale} />
  </div>
</div>

<style lang="postcss">
  .section {
    --spacing: var(--half-element-spacing);
  }

  .recipe-card-image {
    width: var(--recipe-card-image-size);
    border: var(--recipe-card-border);
    position: relative;
    margin-top: calc(var(--recipe-card-image-size) * -0.5);
    align-self: center;
  }

  .recipe-card-wrapper {
    --recipe-card-border: 1px solid var(--color-black);
    --recipe-card-image-size: 150px;
    --recipe-card-padding: 8px;

    @media screen and (--tablet-and-larger) {
      --recipe-card-image-size: 200px;
    }

    background-color: var(--color-primary-50);
    
    display: flex;
    flex-flow: column nowrap;
    gap: var(--element-spacing);
    width: 100%;

    margin-top: calc(var(--recipe-card-image-size) * 0.5);
    border: var(--recipe-card-border);
    padding: 0 var(--recipe-card-padding);

    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);

    @media screen and (--tablet-and-larger) {
      font-size: var(--font-size-md);
      line-height: var(--line-height-md);
    }
  }
</style>