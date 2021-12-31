<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import {getRecipeDataBySlug, RecipeData} from '$lib/sanity';
  import RecipeHeader from '$lib/components/recipe/recipe-header.svelte';
  import Image from '$lib/components/sanity-image.svelte';
  import {widths, sizes} from '$lib/image-responsive';
  import BlockContent from '$lib/components/block-content/block-content.svelte';
  import HeartDivider from '$lib/components/heart-divider.svelte';
  import RecipeCard from '$lib/components/recipe/recipe-card.svelte';
  import RecommendedProducts from '$lib/components/recommended-products.svelte';
  import ShareMessage from '$lib/components/recipe/recipe-share-message.svelte';
  import ContributorBio from '$lib/components/contributor-bio.svelte';


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
  export let recipe: RecipeData;  

  const {
    author,
    name: title,
    headerTags: tags,
    mainImage,
    secondaryImage,
    description,
    pinterestImage,
    pinterestImageAlt,
    post,
    postClosing,
    affiliateProducts: products,
  } = recipe;

  const images = [mainImage, secondaryImage, pinterestImageAlt].filter(img => !!img);
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
  <HeartDivider />
  <ContributorBio {author}/>
  <HeartDivider />
</div>

<style lang="postcss">
  .recipe-page-wrapper {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--element-spacing);
    align-items: center;
  }
  
</style>