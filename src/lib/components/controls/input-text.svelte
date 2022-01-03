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
  input {
    border: 1px solid var(--color-primary-400);
    border-radius: 4px;
    padding: 8px;
    padding-left: 12px;

    &::placeholder {
      color: var(--color-primary-800);
    }

    &:disabled {
      border-color: var(--color-primary-300);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary-600);
    }
  }
</style>