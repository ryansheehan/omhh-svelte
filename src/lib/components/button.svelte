<script lang="ts">
  
</script>

<button {...$$restProps} on:click><slot></slot></button>

<style lang="postcss">
  button {
    flex: 1;  
    border: 1px solid var(--color-black);
    padding: 8px 16px;  
    background-color: var(--color-primary-400);    
    cursor: pointer;
  }
</style>