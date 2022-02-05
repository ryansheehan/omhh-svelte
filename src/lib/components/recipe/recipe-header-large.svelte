<script lang="ts">
  import type {ImageData} from '$lib/sanity';
  import Image from '$lib/components/sanity-image.svelte';
  import Button from '$lib/components/controls/button.svelte';
  import HeaderTags from './recipe-header-tags.svelte';

  export let images: ImageData[];
  export let title: string;
  export let tags: string[] = [];
  export let caption: string;  
  export let onJumpToRecipe: () => void;
</script>

<div class="recipe-card-wrapper">
  <Image source={images[0]} showCaption={false} />
  <div class="recipeInfo">
    {#if tags.length > 0}
      <HeaderTags tags={tags} />
    {/if}
    <h2 class="recipe-title">{title}</h2>
    <p>{caption}</p>
    <div class="header-button-container">
      <Button on:click={onJumpToRecipe}>Jump to recipe</Button>   
      <Button>Share</Button> 
    </div>
  </div>
  <Image source={images[1]} showCaption={false} />
</div>

<style lang="postcss">
  .recipe-card-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;    
  }

  .recipeInfo {    
    padding: 0 16px;
    padding-top: 16px;
    display: grid;
    grid-template-rows: auto auto auto auto;
    row-gap: 16px;
    align-items: flex-start;
    /* display: flex;
    flex-flow: column nowrap;
    gap: 16px;
    align-items: center; */
    text-align: center;

    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);

    & p {
      margin-top: 1rem;

      @media screen and (--laptop-and-larger) {
        padding-left: 32px;
        padding-right: 32px;
      }
    }
  }

  .header-button-container {
    display: flex;     
    gap: 16px;       
  }
</style>