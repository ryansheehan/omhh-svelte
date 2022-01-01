<script context="module" lang="ts">
  export interface CarouselDataItem<T> {
    props: T,
    key: number|string|Symbol,
  }

  export type CarouselData<T> = CarouselDataItem<T>[];
</script>

<script lang="ts">
  import '@splidejs/splide/dist/css/splide.min.css';
  import {Splide, SplideSlide} from '@splidejs/svelte-splide';
  import type { SvelteComponent } from 'svelte';
  import type { Options } from '@splidejs/splide';

  export const defaultOptions: Options = {
    type: 'loop',    
    gap: '1rem',
    width: '100%',
    autoplay: true,
    pauseOnHover: true,
    perPage: 1,
    perMove: 1,
    pagination: true,
    arrows: false,
    classes: {
      pagination: 'omhh-pagination splide__pagination',
      page: 'omhh-carousel-page-button splide__pagination__page',
    }
  }

  export let options: Options = { }
  export let data: CarouselData<any> = [];
  export let slide: typeof SvelteComponent;

  const resolvedOptions = {
    ...defaultOptions,
    ...options,
  }
</script>

<Splide options={resolvedOptions}>
  {#each data as {props, key} (key)}
    <SplideSlide>
      <svelte:component this={slide} {...props}/>
    </SplideSlide>
  {/each}
</Splide>
