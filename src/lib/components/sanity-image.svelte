<script lang="ts">
  import {imageBuilder, ImageData} from '$lib/sanity';

  export let source: ImageData;  
  export let widths: number[] = [];
  export let sizes: string[] = [];
  let className = '';
  export {className as class};
  export let showCaption = true;
  export let alignCaption: 'center' | 'flex-start' | 'flex-end' = 'center';
  export let quality = 80;

  const {
    alt,
    caption,
  } = source;

  const imgUrls = widths.map(width => imageBuilder.image(source).width(width).quality(quality).auto('format').url());
  const src = imgUrls.length > 0 ? imgUrls[imgUrls.length - 1] : imageBuilder.image(source).quality(quality).auto('format').url();
  const srcset = widths.map((width, i) => `${imgUrls[i]} ${width}w`).join(', ');


</script>

<figure class={`${className}`}>
  <img class="sanity-image" src={src} srcset={srcset} sizes={sizes.join(', ')} alt={alt} />
  {#if caption && showCaption}
    <figcaption style="--align-caption: {alignCaption}">{caption}</figcaption>
  {/if}
</figure>

<style>
  :root {
    --align-caption: 'center';
  }

  figure {
    width: fit-content;
  }

  figcaption {
    text-align: var(--align-caption);
  }
</style>