<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import {getRecipeDataBySlug, RecipeData} from '$lib/sanity';

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
</script>

<div>Recipe Page for {recipe.name}</div>

<style>

</style>