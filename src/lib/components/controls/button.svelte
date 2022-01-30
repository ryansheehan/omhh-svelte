<script lang="ts">
  
</script>

<button {...$$restProps} on:click><slot></slot></button>

<style lang="postcss">
  button {
    flex: 1;  
    border: 1px solid var(--color-black);
    padding: 8px 16px;  
    background-color: var(--color-primary-400);        
    box-shadow: var(--shadow-elevation-low);

    &:disabled {
      border: none;
      background-color: var(--color-primary-300);
      cursor: auto;
    }

    @media screen and (--tablet-and-larger) {
      cursor: pointer;
    }
  }
</style>