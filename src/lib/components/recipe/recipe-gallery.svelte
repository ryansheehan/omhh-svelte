<script lang="ts">
  import type {ImageData} from '$lib/sanity';
  import RecipeImageCarousel from '$lib/components/recipe/recipe-image-carousel.svelte';

  export let images: ImageData[];
</script>

<h4 class="title">Gallery</h4>
<RecipeImageCarousel {images}/>

<style lang="postcss">
  .title:after {
    content: ':';
  }
</style>