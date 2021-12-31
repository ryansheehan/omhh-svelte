<script lang="ts">
  import ExternalLink from '$lib/components/external-link.svelte';
  import Carousel from '$lib/components/carousel.svelte';
  import type {AffiliateData} from '$lib/sanity';

  export let products: AffiliateData[];
</script>

<h5>Recommended products<br/>to make this recipe</h5>
<Carousel {products} options={{perPage: 2}}/>
<div>
  <p>By clicking on our ads and affiliate links, you are helping to support this blog. We may make a small commission on products that are purchased through our links, at no additional cost to you. This allows us to continue to bring recipes and nutrition information from our home to yours. A portion of all proceeds go to benefit <ExternalLink href="https://www.jdrf.org/">JDRF</ExternalLink> and <ExternalLink href="https://www.t1international.com/">T1International.</ExternalLink>&emsp;<ExternalLink href="https://www.t1international.com/usainsulin4allaction/&sa=D&source=hangouts&ust=1641001507600000&usg=AOvVaw2-k9jYvD0FPRWBJFsKoAhp">#insulin4all</ExternalLink></p>
  <p>Thank you for your support! Click here to learn more about our Affiliate Program Memberships</p>  
</div>


<style lang="postcss">  
  div {
    text-align: center;    
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
  }
  @media (--tablet-and-larger) {
    br {
      display: none;
    }
  }

  h5 {
    text-align: center;
  }
</style>