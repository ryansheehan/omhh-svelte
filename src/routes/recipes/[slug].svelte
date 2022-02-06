<script lang="ts" context="module">  
  import {getRecipeDataBySlug, RecipeData} from '$lib/sanity';

  export const load = async ({params, fetch}) => {    
    const slug = params.slug;
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
  import RecommendedProducts from '$lib/components/affiliate/recommended-products-carousel.svelte';
  import ShareMessage from '$lib/components/recipe/recipe-share-message.svelte';
  import ContributorBio from '$lib/components/contributor-bio.svelte';
  import SupportedOrganizations from '$lib/components/supported-organizations.svelte';
  import RelatedLinks from '$lib/components/recipe/recipe-related-links.svelte';
  import RecipeGallery from '$lib/components/recipe/recipe-gallery.svelte';
  import EmailSignup from '$lib/components/forms/email-signup.svelte';

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

  let recipeCard: RecipeCard;
  
  const scrollToRecipe = () => recipeCard?.scrollTo();
</script>

<div class="recipe-page-wrapper">
  <div class="recipe-page-header">
    <RecipeHeader {title} {images} {tags} caption={description} on:scrollToRecipe={scrollToRecipe} />
  </div>
  <div class="main-column">
    {#if pinterestImage}
    <div class="pinterest-image">
      <div>
        <Image source={pinterestImage} widths={widths} sizes={sizes} showCaption={false} />
      </div>
    </div>
    {/if}
    <BlockContent blocks={post} />
    <HeartDivider />
    <BlockContent blocks={postClosing} />
    {#if products}
    <RecommendedProducts {products} />
    {/if}
    <RecipeCard recipe={recipe} bind:this={recipeCard} />
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
    <div class="hide-when-large">
      <HeartDivider />      
    </div>
  </div>
  <aside class="aside-column">
    <ContributorBio {author}/>    
    <Image source={carbImage} widths={imageConfig.aside.widths} sizes={imageConfig.aside.sizes} showCaption={false} />    
    <HeartDivider />
    <SupportedOrganizations />
    <HeartDivider />
    <EmailSignup from="recipe" />
  </aside>
</div>

<style lang="postcss">

  .main-column, .aside-column {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--element-spacing);
    align-items: center;        
  }
  .recipe-page-wrapper {
    --aside-border-width: 2px;
    --aside-half-margin: calc(var(--half-element-spacing) - (var(--aside-border-width) / 2));

    display: grid;    
    grid-template-columns: 2fr 1fr;  
    grid-template-rows: auto 1fr;  
    row-gap: var(--element-spacing);
    align-items: flex-start;

    max-width: calc(var(--page-width) * 2 / 3);
    @media screen and (--laptop-and-larger) {
      max-width: initial;
    }
  }
  .recipe-page-header, .main-column, .aside-column {
    grid-column: 1 / 3;
  } 

  .pinterest-image {  
    width: 100%;      
    background-color: var(--color-primary-100);
    display: flex;
    justify-content: center;

    & div {
      max-width: 500px;
    }
  }

  @media screen and (--laptop-and-larger) {    
    .main-column {
      grid-column: 1 / 2;
      padding-right: var(--aside-half-margin);
      border-right: var(--aside-border-width) solid var(--color-primary-400);
    }

    .aside-column {
      grid-column: 2 / 3;
      padding-left: var(--aside-half-margin);
    }
    .hide-when-large {      
      display: none;
    }
  }
</style>