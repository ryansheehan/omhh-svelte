<script lang="ts">  
  import Carousel from '$lib/components/carousel.svelte';
  import ProceedsMessage from '$lib/components/proceeds-message.svelte';
  import type {AffiliateData} from '$lib/sanity';

  export let products: AffiliateData[];
</script>

<h5>Recommended products<br/>to make this recipe</h5>
<Carousel {products} options={{perPage: 2}}/>
<div>
  <p>By clicking on our ads and affiliate links, you are helping to support this blog. We may make a small commission on products that are purchased through our links, at no additional cost to you. This allows us to continue to bring recipes and nutrition information from our home to yours. <ProceedsMessage/></p>
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