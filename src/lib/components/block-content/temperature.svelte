<script lang="ts">
  import type {BlockProps} from '@portabletext/svelte';
  
  interface Temperature {
    fahrenheit: number;
  }
  export let portableText: BlockProps<Temperature>;

  const fahrenheit = portableText.block.fahrenheit;
  const celsius = Math.trunc((fahrenheit - 32) * 5 / 9);
</script>

<span>{fahrenheit}&#8457; ({celsius}&#8451;)</span>

<style>
  span {
    font-weight: var(--font-weight-bold);
  }
</style>