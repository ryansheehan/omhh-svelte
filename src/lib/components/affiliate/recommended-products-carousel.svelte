<script lang="ts">  
  import Carousel, {CarouselData} from '$lib/components/carousel.svelte';
  import ProceedsMessage from '$lib/components/proceeds-message.svelte';
  import type {AffiliateData} from '$lib/sanity';  
  import AffiliateProductLink from '$lib/components/affiliate/affiliate-product-link.svelte';

  export let products: AffiliateData[];

  type ProductCarouselProps = CarouselData<{html: string}>;
  const data: ProductCarouselProps = products.map(({_id: key, imageUrl: html}) => ({
    key,
    props: {
      html,      
    }
  }))
</script>

<h5>Recommended products<br/>to make this recipe</h5>
<Carousel {data} options={{perPage: 2}} let:props>
  <AffiliateProductLink {...props}/>
</Carousel>
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
  @media screen and (--tablet-and-larger) {
    br {
      display: none;
    }
  }

  h5 {
    text-align: center;
  }
</style>