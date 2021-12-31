<script lang="ts">
  import type {MarkProps} from '@portabletext/svelte';
  import ExternalLink from '$lib/components/external-link.svelte';  

  export let portableText: MarkProps<{url: string}>;

  const text = portableText.span.text;
  const href = portableText.mark.url;
</script>

<ExternalLink {href}>{text}</ExternalLink>

