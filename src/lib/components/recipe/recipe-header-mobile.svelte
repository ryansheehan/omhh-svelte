<script lang="ts">  
  import type {ImageData} from '$lib/sanity';
  import HeaderTags from './recipe-header-tags.svelte';
  import RecipeImageCarousel from '$lib/components/recipe/recipe-image-carousel.svelte';
  import Button from '$lib/components/controls/button.svelte';

  export let images: ImageData[];
  export let title: string;
  export let tags: string[] = [];
  export let caption: string; 
  export let onJumpToRecipe: () => void;
</script>

<div class="recipe-header-wrapper">
  {#if tags.length > 0}
    <HeaderTags tags={tags} />
  {/if}
  <h2 class="recipe-title">{title}</h2>
  <RecipeImageCarousel {caption} {images} />
  
  <div class="header-button-container">
    <Button on:click={onJumpToRecipe}>Jump to recipe</Button>
    <Button>Share</Button>
  </div>
</div>

<style lang="postcss">
  .header-button-container {
    display: flex;
    justify-content: center;
    gap: 16px;
    width: 100%;
  }

  .recipe-header-wrapper {    
    margin: 0 calc(-1 * var(--page-padding));
    padding: var(--page-padding);
    display: flex;
    flex-flow: column nowrap;
    gap: var(--element-spacing);
    align-items: center;
    background-color: var(--color-primary-50);
  }

  .recipe-title {
    text-align: center;    
  }
</style>