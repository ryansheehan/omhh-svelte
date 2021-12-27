<script lang="ts">
  import {onMount} from 'svelte'
  import Portal from 'svelte-portal/src/Portal.svelte';
  import {modalOpen, close} from '$lib/store/modal';
  
  let bodyElement: HTMLElement | undefined = undefined;
  onMount(() => bodyElement = document?.body);

  let overflowState: string;
  if (bodyElement) {
    if ($modalOpen) {
      overflowState = bodyElement.style.overflow;
      bodyElement.style.overflow = 'hidden';
    } else {
      bodyElement.style.overflow = overflowState;
    }
  }
</script>

{#if $modalOpen}
<Portal target="#modal">
  <div class="backdrop" on:click={close}>
    <slot></slot>
  </div>
</Portal>
{/if}

<style>
  .backdrop {
    position: sticky;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: hsl(0deg 0% 0% / 0.5);
  }
</style>