<script lang="ts">
  import type {MarkProps} from '@portabletext/svelte';

  export let portableText: MarkProps<any>;
  console.log('markProps', portableText);
</script>

<span>DEBUG MARK</span>