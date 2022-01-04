<script lang="ts">
  import type {BlockData, IngredientGroup, FoodData} from '$lib/sanity';
  import BlockContent from '$lib/components/block-content/block-content.svelte'

  export let ingredientGroups: IngredientGroup[] = [];

  function extractNotes(ingredientGroups: IngredientGroup[]) {
    const noteMap = new Map<number, BlockData>();
    ingredientGroups.forEach(group => group.ingredients.forEach(ingredient => {
      if (ingredient.food._type === 'food') {
        const {fdc_id, notes} = ingredient.food as FoodData;
        if (notes && !noteMap.has(fdc_id)) {        
          noteMap.set(fdc_id, notes);
        }
      }
    }));
    const notes: {fdcid: number, blocks: BlockData}[] = [];
    noteMap.forEach((blocks, fdcid) => notes.push({fdcid, blocks}));
    return notes;
  }

  const notes = extractNotes(ingredientGroups);
</script>

{#if notes.length > 0}
<h4 class="header">Notes</h4>
<ul>
  {#each notes as {fdcid, blocks} (fdcid)}
  <li><BlockContent blocks={blocks} spacing="var(--half-element-spacing)"/></li>
  {/each}
</ul>
{/if}

<style lang="postcss">
  .header, ul {
    padding-bottom: var(--spacing);
  }

  ul {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--spacing);
  }
</style>