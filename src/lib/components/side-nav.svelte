<script lang="ts">  
  import { fly, FlyParams } from 'svelte/transition';
  import Modal from '$lib/components/modal.svelte';
  import {close} from '$lib/store/modal';

  const flyParams: FlyParams = {
    duration: 200,
    x: -200,
  };
</script>

<Modal>
  <div class="side-menu-content-wrapper" on:click|stopPropagation transition:fly={flyParams}>
    <a href="/">Home</a>  
  </div>
</Modal>

<style>
  .side-menu-content-wrapper {
    width: min(66vw, 400px);
    height: 100%;
    background-color: var(--color-white);
  }
</style>