<script lang="ts">
  import BlockContent from '$lib/components/block-content/block-content.svelte';
  import type { StepGroup } from '$lib/sanity';

  export let stepGroups: StepGroup[];
  console.log(stepGroups);
</script>

<h4 class="header">Steps</h4>
{#each stepGroups as {header, steps, key} (key)}
  {#if header}
    <h5>{header}</h5>
  {/if}
  <ol class="sub-header">
    {#each steps as {instructions, _key} (_key)}
      <li><BlockContent blocks={instructions} spacing="calc(var(--element-spacing) / 4)"/></li>
    {/each}
  </ol>
{/each}

<style>
  .header, .sub-header, ol {
    padding-bottom: var(--spacing);
  }

  ol:last-of-type {
    padding-bottom: 0;
  }

  ol {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--spacing)
  }
</style>