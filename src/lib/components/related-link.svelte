<script lang="ts">
  import type { RelatedLink } from '$lib/sanity';
  import Image from '$lib/components/sanity-image.svelte';
  import { imageConfig } from '$lib/responsive';

  export let link: RelatedLink;
  const {
    image,
    href,
    name,
  } = link;

  const {widths, sizes} = imageConfig.thumbnail;
</script>

<a {href}>
  <Image source={image} {widths} {sizes} showCaption={false} />
  <h5>{name}</h5>
</a>

<style lang="postcss">
  a, a:hover, a:visited, a:link {
    text-decoration: none;
    color: var(--color-black);
  }

  a {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--half-element-spacing);
    text-align: center;    
  }

  h5 {
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
  }
</style>