<script lang="ts">
  import { validators, Validator } from 'svelte-use-form';
  export let value: string = '';
  let validatorCollection: Validator[] = [];
  export {validatorCollection as validators};
</script>

<input type="text" bind:value 
  on:change 
  on:blur 
  on:input 
  use:validators={validatorCollection}
  {...$$restProps}
>

<style lang="postcss">

</style>