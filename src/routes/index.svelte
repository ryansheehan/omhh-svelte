<script lang="ts" context="module">  
  import type { Load } from '@sveltejs/kit'
  import {getRecipeList} from '$lib/sanity'

  export const load: Load = async ({fetch}) => {
    const recipes = await getRecipeList(fetch);

    return {
      props: {
        recipes
      }
    };
  }
</script>

<script lang="ts" >
  import Listing from '$lib/components/landing/recipe-listing.svelte';

  export let recipes;
</script>

<div class="listing-container">
{#each recipes as listing}
<Listing {listing} />
{/each}
</div>

<style lang="postcss">  
  .listing-container {    
    display: flex;
    flex-flow: row wrap;
    gap: 8px;
  }
</style>
