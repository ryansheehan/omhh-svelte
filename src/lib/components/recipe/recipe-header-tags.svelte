<script lang="ts">
  export let tags: string[] = [];
</script>

<div class="tags-container">
  {#each tags as tag}
  <span class="tag">{tag}</span>
  {/each}
</div>

<style lang="postcss">
   .tags-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;  
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
    text-align: center;
    text-transform: uppercase;
  }

  .tag:after {
    content: '|';
    padding: 0 1ch;
  }

  .tag:last-child:after {
    content: '';
    padding: 0;
  }
</style>