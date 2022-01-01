<script lang="ts">
  import RelatedLinksCarousel, {RelatedLinks} from '$lib/components/related-links-carousel.svelte';
  
  export let title: string;
  export let links: RelatedLinks;
</script>

<h4 class="title">{title}</h4>
<RelatedLinksCarousel {links} />

<style lang="postcss">
  .title {
    text-align: center;
    &:after {
      content: ':';
    }
  }
</style>