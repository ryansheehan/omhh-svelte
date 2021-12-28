<script lang="ts">
  import type {BlockProps} from '@portabletext/svelte';
  
  interface EmojiProps {
    emoji: string;
    names: string[];
    originalUnified: string;
    unified: string;
  }

  export let portableText: BlockProps<EmojiProps>;

  const emoji = portableText.block.emoji;
</script>

<span>{emoji}</span>