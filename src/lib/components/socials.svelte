<script lang="ts">
  import Instagram from '$lib/icons/instagram.svelte';
  import Facebook from '$lib/icons/facebook.svelte';
  import Pinterest from '$lib/icons/pinterest.svelte';
  import Twitter from '$lib/icons/twitter.svelte';
</script>

<div>
  <a href="https://instagram.com/ohmyheartandhome" target="_blank" rel="noopener"><Instagram /></a>
  <a href="https://facebook.com/ohmyheartandhome" target="_blank" rel="noopener"><Facebook /></a>
  <a href="https://pinterest.com/ohmyheartandhome" target="_blank" rel="noopener"><Pinterest /></a>
  <a href="https://twitter.com/ohmyhearthome" target="_blank" rel="noopener"><Twitter /></a>
</div>

<style lang="postcss">
  div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    gap: 8px;
    padding: 8px 0;
  }

  a {
    width: 24px;
    color: var(--color-primary-900);
    text-decoration: none;
  }
</style>