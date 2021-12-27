<script lang="ts">
  import {onMount} from 'svelte';
  import Portal from 'svelte-portal/src/Portal.svelte';
  import MenuIcon from '$lib/icons/menu.svelte';
  import VisuallyHidden from '$lib/components/visuall-hiddent.svelte';

  let showMenu = false;
  let bodyElement: HTMLElement | undefined = undefined;
  let savedOverflowState: string;

  onMount(() => {
    bodyElement = document.body as HTMLElement;
  });

  const toggleShowMenu = () => {
    showMenu = !showMenu;
    if(bodyElement) {
      if (showMenu) {
        savedOverflowState = bodyElement.style.overflow;
        bodyElement.style.overflow = 'hidden';
      } else {
        bodyElement.style.overflow = savedOverflowState;
      }
    }
  };
</script>

<button on:click={toggleShowMenu}>
  <MenuIcon />
  <VisuallyHidden>Open Menu</VisuallyHidden>
</button>

{#if showMenu}
<Portal target="#modal">
  <div class="backdrop" on:click={toggleShowMenu}>
    <div class="side-menu-content-wrapper" on:click|stopPropagation>
      <slot></slot>
    </div>
  </div>
</Portal>
{/if}

<style>
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .backdrop {
    position: sticky;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: hsl(0deg 0% 0% / 0.5);
  }

  .side-menu-content-wrapper {
    width: min(66vw, 400px);
    height: 100%;
    background-color: var(--color-white);
  }
</style>