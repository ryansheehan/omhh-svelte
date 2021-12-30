<script lang="ts">
  import '@splidejs/splide/dist/css/splide.min.css';
  import {Splide, SplideSlide} from '@splidejs/svelte-splide';
  import type { Options } from '@splidejs/splide';
  import Image from '$lib/components/sanity-image.svelte';
  import type { ImageData, AffiliateData } from '$lib/sanity';

  // https://splidejs.com/guides/options/
  export const defaultOptions: Options = {
    type: 'loop',    
    gap: '1rem',
    width: '100%',
    autoplay: true,
    pauseOnHover: true,
    perPage: 2,
    perMove: 1,
    pagination: true,
    arrows: false,
    classes: {
      pagination: 'omhh-pagination splide__pagination',
      page: 'omhh-carousel-page-button splide__pagination__page',
    }
  }

  export let options: Options = { }
  export let images: ImageData[] = [];
  export let imageWidths: number[] = [];
  export let imageSizes: string[] = [];
  export let products: AffiliateData[] = [];

  const resolvedOptions = {
    ...defaultOptions,
    ...options,
  }
</script>

<Splide options={resolvedOptions}>
  {#each images as image, index (index) }
    <SplideSlide>
      <div class="image-container">
        <Image source={image} widths={imageWidths} sizes={imageSizes} showCaption={false}/>
      </div>
    </SplideSlide>
  {/each}
  {#each products as {_id, imageUrl} (_id)}
    <SplideSlide>
      {@html imageUrl}
    </SplideSlide>
  {/each}
</Splide>

<style lang="postcss">
  .image-container {
    width: var(--container-width);
  }

  :global(.omhh-pagination) {
    position: relative;    
  }

  :global(li.splide__slide) {
    display: flex;
    align-items: center;
  }

  :global(.omhh-carousel-page-button) {
    background-color: var(--color-primary-600);
  }

  :global(.omhh-carousel-page-button.is-active) {
    background-color: var(--color-primary-900);
    transform: scale(1.2);
  }
</style>