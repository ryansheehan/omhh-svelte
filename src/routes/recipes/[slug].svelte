<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import {getRecipeDataBySlug, RecipeData} from '$lib/sanity';

  export const load: Load = async ({fetch, page}) => {
    const slug = page.params.slug;
    const recipe = await getRecipeDataBySlug(slug, fetch);
    return {
      props: {
        recipe,
      }
    }
  }
</script>

<script lang="ts">
  import {imageConfig} from '$lib/responsive';
  import RecipeHeader from '$lib/components/recipe/recipe-header.svelte';
  import Image from '$lib/components/sanity-image.svelte';  
  import BlockContent from '$lib/components/block-content/block-content.svelte';
  import HeartDivider from '$lib/components/heart-divider.svelte';
  import RecipeCard from '$lib/components/recipe/recipe-card.svelte';
  import RecommendedProducts from '$lib/components/recommended-products-carousel.svelte';
  import ShareMessage from '$lib/components/recipe/recipe-share-message.svelte';
  import ContributorBio from '$lib/components/contributor-bio.svelte';
  import SupportedOrganizations from '$lib/components/supported-organizations.svelte';
  import RelatedLinks from '$lib/components/recipe/recipe-related-links.svelte';
  import RecipeGallery from '$lib/components/recipe/recipe-gallery.svelte';
  import EmailSignup from '$lib/components/email-signup.svelte';

  const {widths, sizes} = imageConfig.full;


  export let recipe: RecipeData;  

  const {
    author,
    name: title,
    headerTags: tags,
    mainImage,
    secondaryImage,
    description,
    pinterestImage,
    carbImage,
    post,
    postClosing,
    affiliateProducts: products,
    alsoLike,
    serveWith,   
    serveWithName, 
    gallery,
  } = recipe;

  const images = [mainImage, secondaryImage, carbImage].filter(img => !!img);
</script>

<div class="recipe-page-wrapper">
  <RecipeHeader {title} {images} {tags} caption={description} />
  {#if pinterestImage}
  <Image source={pinterestImage} widths={widths} sizes={sizes} showCaption={false} />
  {/if}
  <BlockContent blocks={post} />
  <HeartDivider />
  <BlockContent blocks={postClosing} />
  <RecommendedProducts {products} />
  <RecipeCard recipe={recipe} />
  <ShareMessage />
  {#if serveWith?.length > 0}
  <RelatedLinks title="What to serve with {serveWithName || 'this recipe'}" links={serveWith} />
  {/if}
  {#if alsoLike?.length > 0}
  <RelatedLinks title="You may also like" links={alsoLike} />
  {/if}
  {#if gallery?.length > 0}
  <RecipeGallery images={gallery}/>
  {/if}
  <HeartDivider />
  <ContributorBio {author}/>
  <HeartDivider />
  <SupportedOrganizations />
  <HeartDivider />
  <EmailSignup from="recipe" />
</div>

<style lang="postcss">
  .recipe-page-wrapper {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--element-spacing);
    align-items: center;
  }

  .recipe-page-wrapper :global(.reduced-width) {
    width: 80%;
  }
  
</style>