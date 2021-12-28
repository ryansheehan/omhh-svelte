<script lang="ts">
  import type {BlockProps} from '@portabletext/svelte';
  import Image from '$lib/components/sanity-image.svelte';
  import type {ImageData} from '$lib/sanity';
  import {widths, sizes} from '$lib/image-responsive';
  
  export let portableText: BlockProps<ImageData>;

  const source = portableText.block;
</script>

<Image {source} {widths} {sizes} showCaption={false}/>