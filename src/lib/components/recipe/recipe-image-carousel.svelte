<script lang="ts">
  import type { ImageData } from '$lib/sanity';
  import Image, {ImageProps} from '$lib/components/sanity-image.svelte';
  import type { Options } from '@splidejs/splide';
  import Carousel, {CarouselData} from '$lib/components/carousel.svelte';
  import {imageConfig} from '../../responsive';

  export let images: ImageData[];
  export let caption: string = '';
  export let lazyLoad: boolean = false;

  const options: Options = {
    type: 'slide',
    autoplay: false,
    arrows: false,
    pagination: true,
    heightRatio: 1.5,    
    lazyLoad,
  }

  const data: CarouselData<ImageProps> = images.map((source, key) => ({
    props: {
      source,
      widths: imageConfig.full.widths,
      sizes: imageConfig.full.sizes,
      showCaption: false,
    },
    key,
  }))
</script>

<Carousel {options} {data} let:props>
  <Image {...props} />
</Carousel>
{#if caption}
<p>{caption}</p>
{/if}

<style lang="postcss">
  p {
    text-align: center;
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
    padding: 4px;
  }
</style>