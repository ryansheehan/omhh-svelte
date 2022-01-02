<script lang="ts">
  export let value: string = '';
</script>

<input type="text" bind:value {...$$restProps}>

<style lang="postcss">
  input:focus-visible {
    outline: 4px dashed darkorange;
  }
</style>