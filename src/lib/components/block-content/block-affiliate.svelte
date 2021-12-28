<script lang="ts">
  import type {BlockProps} from '@portabletext/svelte';
  import ExternalLinkIcon from '$lib/icons/external-link.svelte';
  
  interface AffiliateData {
    data: {
      imageUrl: string;
      name: string;
      productUrl: string;
    }
  }
  export let portableText: BlockProps<AffiliateData>;
  const {productUrl, name} = portableText.block.data;
</script>

<a href={productUrl} target="_blank" rel="noopener">{name}<ExternalLinkIcon/></a>

<style>
  a, a:hover, a:visited, a:link {
    text-decoration: none;
    color: var(--color-black);
  }
</style>