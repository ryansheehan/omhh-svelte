<script lang="ts">
  import type {BlockProps} from '@portabletext/svelte';
  
  export let portableText: BlockProps<any>;
  console.log('blockProps', portableText);
</script>

<span>DEBUG TYPE</span>