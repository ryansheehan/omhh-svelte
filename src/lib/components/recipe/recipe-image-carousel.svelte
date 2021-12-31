<script lang="ts">
  import type { ImageData } from '$lib/sanity';
  import type { Options } from '@splidejs/splide';
  import Carousel from '$lib/components/carousel.svelte';
  import {widths, sizes} from '../../image-responsive';

  export let images: ImageData[];
  export let caption: string;

  const options: Options = {
    type: 'slide',
    autoplay: false,
    arrows: false,
    pagination: true,
    heightRatio: 1.5,
    width: '100%',
    fixedWidth: '100%',
  }
</script>

<Carousel images={images} imageWidths={widths} imageSizes={sizes} {options} />
<p>{caption}</p>

<style lang="postcss">
  p {
    text-align: center;
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
    padding: 4px;
  }
</style>