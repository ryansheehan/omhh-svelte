<script lang="ts">
  import type {ImageData} from '$lib/sanity';
  import HeaderTags from './recipe-header-tags.svelte';
  import Image from '$lib/components/sanity-image.svelte';
  import {widths, sizes} from '../../image-responsive';

  export let image: ImageData;
  export let title: string;
  export let tags: string[] = [];
  export let caption: string;
</script>

<div class="recipe-header-wrapper">
  {#if tags.length > 0}
    <HeaderTags tags={tags} />
  {/if}
  <h2 class="recipe-title">{title}</h2>
  <Image 
    source={image} 
    widths={widths} 
    sizes={sizes}     
    captionOverride={caption}
    captionAlign="flex-start"
    captionFontSize="sm"
  />
  <div class="header-button-container">
    <button>Jump to recipe</button>
    <button>Share</button>
  </div>
</div>

<style lang="postcss">
  .header-button-container {
    display: flex;
    justify-content: center;
    gap: 16px;
    width: 100%;
  }

  button {
    flex: 1;  
    border: 1px solid var(--color-black);
    padding: 4px;  
    background-color: var(--color-primary-400);
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