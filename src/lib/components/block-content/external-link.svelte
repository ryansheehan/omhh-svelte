<script lang="ts">
  import type {MarkProps} from '@portabletext/svelte';
  import ExternalLinkIcon from '$lib/icons/external-link.svelte';

  export let portableText: MarkProps<{url: string}>;

  const text = portableText.span.text;
  const url = portableText.mark.url;
</script>

<a href={url} target="_blank" rel="noopener">{text}<ExternalLinkIcon /></a>

<style>
  a, a:hover, a:visited, a:link {    
    color: var(--color-primary-900);
    text-decoration: underline dotted;
    white-space: nowrap;
  }
</style>