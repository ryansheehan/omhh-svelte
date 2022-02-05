<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type {ImageData} from '$lib/sanity';
  import { mediaSize, isLaptopAndLarger, printMediaSize } from '$lib/store/responsive';
  import MobileRecipeHeader from './recipe-header-mobile.svelte';
  import LargeRecipeHeader from './recipe-header-large.svelte';

  export let images: ImageData[];
  export let title: string;
  export let tags: string[] = [];
  export let caption: string; 

  const dispatch = createEventDispatcher();
  const onJumpToRecipe = () => dispatch('scrollToRecipe');  
</script>

{#if isLaptopAndLarger($mediaSize)}
  <LargeRecipeHeader {images} {title} {tags} {caption} {onJumpToRecipe}/>
{:else}
  <MobileRecipeHeader {images} {title} {tags} {caption} {onJumpToRecipe}/>
{/if}
