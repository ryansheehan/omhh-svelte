<script lang="ts">
  import type {Contributor} from '$lib/sanity';
  import BlockContent from '$lib/components/block-content/block-content.svelte';
  import Image from '$lib/components/sanity-image.svelte';
  import Socials from '$lib/components/socials.svelte';
  import {imageConfig} from '$lib/image-responsive';

  export let author: Contributor;

  const {widths, sizes} = imageConfig.full;

  const {    
    image,
    bio
  } = author;
</script>

<div>
  <Image source={image} {widths} {sizes} showCaption={false} />
  <BlockContent blocks={bio} spacing='var(--half-element-spacing)' />
  <Socials/>
</div>

<style lang="postcss">
  div {
    text-align: center;
    display: flex;
    flex-flow: column;
    gap: var(--half-element-spacing);
  }
</style>