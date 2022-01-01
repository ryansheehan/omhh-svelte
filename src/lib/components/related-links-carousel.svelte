<script context="module" lang="ts">
  import type { RelatedLink } from '$lib/sanity';
  export type { RelatedLink } from '$lib/sanity';
  export type RelatedLinks = RelatedLink[];
</script>

<script lang="ts">
  import Carousel, {CarouselData} from '$lib/components/carousel.svelte';
  import RelatedLinkComponent from '$lib/components/related-link.svelte';  
  import type { Options } from '@splidejs/splide';

  export let links: RelatedLinks = [];

  const data: CarouselData<{link: RelatedLink}> = links.map((link, key) => ({
    props: {
      link
    },
    key
  }))

  const options: Options = {
    perPage: 2,
    perMove: 2,
    lazyLoad: true,
    autoplay: false,
    pagination: true,
    arrows: false,
    type: 'slide',
  }
</script>

<Carousel {data} {options} slide={RelatedLinkComponent} />