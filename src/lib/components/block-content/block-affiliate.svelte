<script lang="ts">
  import type {BlockProps} from '@portabletext/svelte';
  import ExternalLinkIcon from '$lib/icons/external-link.svelte';
  import type {AffiliateData} from '$lib/sanity';
  
  interface AffiliateBlockProps {
    data: AffiliateData;
  }
  export let portableText: BlockProps<AffiliateBlockProps>;
  
  if (!portableText.block.data)
    console.log(portableText);

  const {productUrl, name} = portableText.block.data || {};
</script>

<a href={productUrl || '#'} target="_blank" rel="noopener">{name || 'NOT FOUND'}<ExternalLinkIcon/></a>

<style lang="postcss">
  a, a:hover, a:visited, a:link {
    text-decoration: none;
    color: var(--color-black);    
  }
</style>