<script lang="ts">
  import {onMount, onDestroy} from 'svelte'
  import { fade } from 'svelte/transition';
  import Portal from 'svelte-portal/src/Portal.svelte';
  import {modalOpen, close} from '$lib/store/modal';
  
  let bodyElement: HTMLElement | undefined = undefined;
  
  const {disableScroll, enableScroll} = (() => {
    let overflowState: string;

    return {
      disableScroll: () => {
        if (bodyElement && $modalOpen) {
          overflowState = bodyElement.style.overflow;
          bodyElement.style.overflow = 'hidden';
        }
      },
      enableScroll: () => {
        if (bodyElement && !$modalOpen) {
          bodyElement.style.overflow = overflowState;
          overflowState = undefined;
        }
      }
    }
  })();

  onMount(() => bodyElement = document?.body);
  
  const unsubscribe = modalOpen.subscribe(isOpen => {
    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  });

  onDestroy(() => {
    enableScroll();
    unsubscribe()
  });
</script>

{#if $modalOpen}
<Portal target="#modal">
  <div class="backdrop" on:click={close} transition:fade={{duration: 150}}/>
  <div class="content-wrapper">
    <slot></slot>
  </div>
</Portal>
{/if}

<style>
  .backdrop, .content-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .content-wrapper {
    pointer-events: none;
  }
  .backdrop {
    background-color: hsl(0deg 0% 0% / 0.5);
  }
</style>