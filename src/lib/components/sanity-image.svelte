<script lang="ts">
  import {imageBuilder, ImageData} from '$lib/sanity';

  export let source: ImageData;  
  export let widths: number[] = [];
  export let sizes: string[] = [];
  let className = '';
  export {className as class};
  export let showCaption = true;
  export let captionOverride = ''
  export let captionAlign: 'center' | 'flex-start' | 'flex-end' = 'center';
  export let captionFontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'
  export let quality = 80;

  const {
    alt,
    caption,
  } = source;

  const resolvedCaption = captionOverride || caption;

  const imgUrls = widths.map(width => imageBuilder.image(source).width(width).quality(quality).auto('format').url());
  const src = imgUrls.length > 0 ? imgUrls[imgUrls.length - 1] : imageBuilder.image(source).quality(quality).auto('format').url();
  const srcset = widths.map((width, i) => `${imgUrls[i]} ${width}w`).join(', ');

  const captionStyle = [
    `--align-caption: ${captionAlign}`,
    `--caption-font-size: var(--font-size-${captionFontSize})`,
    `--caption-line-height: var(--line-height-${captionFontSize})`,
  ].join(';');
</script>

<figure class={`${className}`}>
  <img class="sanity-image" src={src} srcset={srcset} sizes={sizes.join(', ')} alt={alt} />
  {#if caption && showCaption}
    <figcaption style={captionStyle}>{resolvedCaption}</figcaption>
  {/if}
</figure>

<style lang="postcss">
  figure {
    display: flex;
    flex-flow: column nowrap;
    gap: calc(var(--element-spacing) * 0.5);    
  }

  figcaption {
    text-align: var(--align-caption);
    font-size: var(--caption-font-size);
    line-height: var(--caption-line-height);
    padding: 4px;
  }
</style>