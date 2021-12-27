<script lang="ts">  
  import Modal from '$lib/components/modal.svelte';
  import {close} from '$lib/store/modal';
</script>

<Modal>
  <div class="side-menu-content-wrapper" on:click|stopPropagation>
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