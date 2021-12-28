<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import {getRecipeDataBySlug, RecipeData} from '$lib/sanity';
  import RecipeHeader from '$lib/components/recipe/recipe-header.svelte';
  import Image from '$lib/components/sanity-image.svelte';
  import {widths, sizes} from '$lib/image-responsive';
  import BlockContent from '$lib/components/block-content/block-content.svelte';

  export const load: Load = async ({fetch, page}) => {
    const slug = page.params.slug;
    const recipe = await getRecipeDataBySlug(slug, fetch);
    return {
      props: {
        recipe,
      }
    }
  }
</script>

<script lang="ts">
  export let recipe: RecipeData;  

  const {
    name,
    headerTags,
    mainImage,
    description,
    pinterestImage,
    post,
  } = recipe;
</script>

<div class="recipe-page-wrapper">
  <RecipeHeader title={name} image={mainImage} tags={headerTags} caption={description} />
  {#if pinterestImage}
  <Image source={pinterestImage} widths={widths} sizes={sizes} showCaption={false} />
  {/if}
  <BlockContent blocks={post} />
</div>

<style>
  .recipe-page-wrapper {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--element-spacing);
    align-items: center;
  }
  
</style>