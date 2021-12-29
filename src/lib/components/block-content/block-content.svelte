<script type="ts">
  import PortableText, { Serializers } from '@portabletext/svelte';
  import type {BlockData} from '$lib/sanity';
  import Emoji from './emoji.svelte';
  import ExternalLink from './external-link.svelte';
  import InternalLink from './internal-link.svelte';
  import Image from './block-image.svelte';
  import T1Ribbon from './t1-ribbon.svelte';
  import Heart from './heart.svelte';
  import AffiliateProduct from './block-affiliate.svelte';
  import Temperature from './temperature.svelte';
  // import BlockTypeDebug from './block-type-debug.svelte';
  // import BlockMarkDebug from './block-mark-debug.svelte';
 
  export let blocks: BlockData;
  export let spacing: string = 'var(--element-spacing)';

  const serializers: Serializers = {
    types: {
      emoji: Emoji,
      t1ribbon: T1Ribbon,
      heart: Heart,
      temperature: Temperature,
      affiliateProductReference: AffiliateProduct,
      image: Image,
    },
    marks: {
      externalLink: ExternalLink,
      internalLink: InternalLink,
    }
  }; 
</script>

{#if blocks}
<div class="portable-text" style="--spacing: {spacing}">
  <PortableText blocks={blocks} serializers={serializers} />
</div>
{/if}

<style lang="postcss">
  .portable-text {
    font-size: var(--font-size-md);
    line-height: var(--line-height-md);
  } 

  .portable-text > :global(*) {
    padding-bottom: var(--spacing);
  }
</style>