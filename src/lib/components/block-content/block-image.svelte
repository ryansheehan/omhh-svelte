<script lang="ts">
  import type {BlockProps} from '@portabletext/svelte';
  import Image from '$lib/components/sanity-image.svelte';
  import type {ImageData} from '$lib/sanity';
  import {imageConfig} from '$lib/responsive';
  
  export let portableText: BlockProps<ImageData>;

  const {widths, sizes} = imageConfig.full;

  const source = portableText.block;
</script>

<div class="image-wrapper">
  <div>
    <Image {source} {widths} {sizes} showCaption={false}/>
  </div>
</div>

<style lang="postcss">
  .image-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: var(--color-white);
    
    & div {      
      max-width: 600px;

      @media screen and (--laptop-and-larger) {
        max-width: 700px;
      }
    }
  }
</style>