<script lang="ts">
  import type {IngredientGroup, RecipeData, FoodData ,BlockData, NutrientData} from '$lib/sanity';
  import { convertAmount } from '$lib/units';
  import Image from '$lib/components/sanity-image.svelte';
  import RecipeCardHeader from '$lib/components/recipe/recipe-card-header.svelte';
  import RecipeCardIngredients from '$lib/components/recipe/recipe-card-ingredients.svelte';
  import RecipeCardSteps from '$lib/components/recipe/recipe-card-steps.svelte';
  import RecipeCardNotes from '$lib/components/recipe/recipe-card-notes.svelte';

  export let recipe: RecipeData;
  
  let scrollToTarget: HTMLElement;
  export const scrollTo = () => scrollToTarget?.scrollIntoView({behavior: 'smooth', block: 'start'});

  function findCarbs(nutrients: NutrientData[]) {
    for(let i = 0; i < nutrients.length; i++) {
      if(nutrients[i].name === 'Carbohydrate, by difference') {
        return nutrients[i].amount;
      }
    }    
    return 0;
  }

  function extractGramsProductsNotes(ingredientGroups: IngredientGroup[]) {
    const ingredientGrams = new Map<string, number>();
    const ingredientProductMap = new Map<string, string>();
    const noteMap = new Map<number, BlockData>();
    let totalCarbs = 0;

    ingredientGroups.forEach(group => group.ingredients.forEach(ingredient => {        
      const food = ingredient.food as FoodData;
      const {fdc_id, notes, nutrients} = food;
      totalCarbs += findCarbs(nutrients);      
      const { amount, divisor, unit, modifier} = ingredient;
      const grams = convertAmount({
        amount: amount / divisor,
        fromUnit: unit,
        fromModifier: modifier,
        toUnit: 'g',
        portions: food.portions,
      });

      if (grams) {
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

    return { ingredientGrams, ingredientProductMap, foodNotes, totalCarbs };
  }

  const {
    squareIGImage,
    name: title,
    description,
    author,
    publishedAt,
    tags,
    prepTime, cookTime, totalTime,
    totalWeight, totalServings,
    ingredients,
    steps,
  } = recipe;

  const {ingredientGrams, ingredientProductMap, foodNotes, totalCarbs} = extractGramsProductsNotes(ingredients);

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
    },
    totalCarbs,    
  }
</script>

<div class="recipe-card-wrapper">
  <div class="recipe-card-image" bind:this={scrollToTarget}>
    <Image source={squareIGImage} widths={[150]} sizes={['150px']} showCaption={false} />  
  </div>
  <RecipeCardHeader {...headerProps} />
  <div class="section">    
    <RecipeCardIngredients ingredientGroups={ingredients} {ingredientGrams} {ingredientProductMap} />
  </div>
  <div class="section">
    <RecipeCardSteps stepGroups={steps} />
  </div>
  <div class="section">
    <RecipeCardNotes notes={foodNotes} />
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

    background-color: var(--color-primary-50);
    
    display: flex;
    flex-flow: column nowrap;
    gap: var(--element-spacing);
    width: 100%;

    margin-top: calc(var(--recipe-card-image-size) * 0.5);
    border: var(--recipe-card-border);
    padding: 0 8px;

    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);
  }
</style>