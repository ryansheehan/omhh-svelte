<script lang="ts">
  import MenuButton from './menu-button.svelte';
  import OmhhTitle from './omhh-title.svelte';
  import HeaderLink from './header-link.svelte';
  import Socials from '$lib/components/socials.svelte';

  import { mediaSize, isTabletAndLarger } from '$lib/store/responsive';

  let y;  
</script>

<svelte:window bind:scrollY={y}/>

<header style="--scroll-shadow: {y > 0 ? 'var(--shadow-elevation-medium)' : 'none'};">    
  <nav class="header-content">
    {#if isTabletAndLarger($mediaSize)}    
      <HeaderLink href="#">Recipes</HeaderLink>
      <HeaderLink href="#">Lifestyle</HeaderLink>
      <OmhhTitle />  
      <HeaderLink href="#">Shop</HeaderLink>
      <HeaderLink href="#">About</HeaderLink>
    {:else}
      <MenuButton/>
      <span class="title-wrapper"><OmhhTitle /></span>
    {/if}
  </nav>
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
    align-items: center;
    justify-content: center;            
    z-index: 10;    

    @media screen and (--laptop-and-larger) {
      
    }
  }

  .header-content {
    display: flex;
    align-items: center;    
    justify-content: space-between;
    gap: 2ch;
    width: 100%;
    max-width: var(--page-width);
  }

  .title-wrapper {
    margin-left: auto;
    margin-right: auto;
  }
</style>