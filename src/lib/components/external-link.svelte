<script lang="ts">
  import ExternalLinkIcon from '$lib/icons/external-link.svelte';

  export let href: string;
</script>

<a {href} target="_blank" rel="noopener"><slot></slot><ExternalLinkIcon /></a>
  
<style lang="postcss">
  a, a:hover, a:visited, a:link {    
    color: var(--color-black);
    /* text-decoration: underline dotted; */
    text-decoration: none;    
  }
</style>