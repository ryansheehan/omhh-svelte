<script lang="ts">
  import type {RecipeListing} from '$lib/sanity';
  import {query} from '$lib/responsive';
  import Image from '$lib/components/sanity-image.svelte';
  export let listing: RecipeListing;

  const {name, description, mainImage, slug} = listing;
</script>

<a href="/recipe/{slug}">
  <div class="recipe-listing-wrapper">
    <Image class="recipe-image" source={mainImage} widths={[250,140]} sizes={[`${query.laptopAndLarger} 250px`, '140px']} showCaption={false}/>
    <h4 class="title">{name}</h4>
    <p class="description">{description || ''}</p>
  </div>
</a>

<style>
  a, a:hover, a:visited, a:active {
    text-decoration: none;
    color: inherit;
  }
  .recipe-listing-wrapper {
    background: #fff;
    border-radius: 4px;
    box-shadow: var(--shadow-elevation-low);
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "image title"
      "image description";    
    gap: 8px;
    margin: 0 auto;
    max-width: 600px;
    padding: 1rem;
    width: 100%;
  }

  .recipe-listing-wrapper :global(.recipe-image) {
    grid-area: image;
  }

  .title {
    grid-area: title;
    text-align: center;
  }

  .description {
    grid-area: description;
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
  }
</style>