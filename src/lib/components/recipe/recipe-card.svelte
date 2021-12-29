<script lang="ts">
  import type {RecipeData} from '$lib/sanity';
  import Image from '$lib/components/sanity-image.svelte';
  import RecipeCardHeader from '$lib/components/recipe/recipe-card-header.svelte';
  import RecipeCardIngredients from '$lib/components/recipe/recipe-card-ingredients.svelte';
  import RecipeCardSteps from '$lib/components/recipe/recipe-card-steps.svelte';

  export let recipe: RecipeData;

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
  }
</script>

<div class="recipe-card-wrapper">
  <Image class="recipe-card-image" source={squareIGImage} widths={[150]} sizes={['150px']} showCaption={false} />  
  <RecipeCardHeader {...headerProps} />
  <div class="section">    
    <RecipeCardIngredients ingredientGroups={ingredients} />
  </div>
  <div class="section">
    <RecipeCardSteps stepGroups={steps} />
  </div>
</div>

<style lang="postcss">
  .section {
    --spacing: calc(var(--element-spacing) / 2);
  }

  .recipe-card-wrapper :global(.recipe-card-image) {
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