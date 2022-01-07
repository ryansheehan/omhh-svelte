<script lang="ts">
  import type {BlockData} from '$lib/sanity';
  import BlockContent from '$lib/components/block-content/block-content.svelte'

  export let notes: {fdcid: number, blocks: BlockData}[] = [];
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