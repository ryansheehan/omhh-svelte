<script lang="ts">
  import MenuButton from '$lib/components/menu-button.svelte';
  import OmhhTitle from '$lib/components/omhh-title.svelte';

  let y;  
</script>

<svelte:window bind:scrollY={y}/>

<header style="--scroll-shadow: {y > 0 ? 'var(--shadow-elevation-medium)' : 'none'}">
  <MenuButton/>
  <OmhhTitle />
</header>

<style lang="postcss">
  header {
    position: sticky;
    top: 0;
    width: 100%;
    background-color: var(--color-white);
    box-shadow: var(--scroll-shadow);
    padding: 8px 16px;
    display: flex;
    z-index: 10;
  }
</style>