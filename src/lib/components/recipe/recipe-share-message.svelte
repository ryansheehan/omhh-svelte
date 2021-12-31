<script lang="ts">
  import ExternalLink from '$lib/components/external-link.svelte';
  const href = 'https://instagram.com/ohmyheartandhome';
</script>

<div>
  <p>Did you make this recipe?  We'd love to see!</p>
  <p>Share it on Instagram and tag <ExternalLink {href}>@ohmyheartandhome.</ExternalLink></p>
</div>

<style lang="postcss">
  div {
    text-align: center;
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
  }
</style>