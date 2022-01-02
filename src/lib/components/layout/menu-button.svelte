<script lang="ts">
  import MenuIcon from '$lib/icons/menu.svelte';
  import VisuallyHidden from '$lib/components/controls/visually-hidden.svelte';
  import {open} from '$lib/store/modal';
</script>

<button on:click={open}>
  <MenuIcon />
  <VisuallyHidden>Open Menu</VisuallyHidden>
</button>

<style lang="postcss">
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }
</style>