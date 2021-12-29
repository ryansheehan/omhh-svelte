<script lang="ts">
  import type {MarkProps} from '@portabletext/svelte';

  interface InternalLinkProps {
    reference?: {
      data?: {
        _type: string;
        slug: string;
      }
    }
  }
  export let portableText: MarkProps<InternalLinkProps>;
  const text = portableText.span.text;
  const reference = portableText.mark.reference;
  let section: string;
  let slug: string;
  if (reference && reference.data) {
    const _type = reference.data._type;
    slug = reference.data.slug;
    switch (_type) {
      case 'recipe':
        section = 'recipes';
        break;
      default:
        console.warn(`internal link ${_type} not supported`);
        section = undefined;
        break;
    }
  }
</script>

{#if section && slug}
  <a href="/{section}/{slug}">{text}</a>
{:else}
  <span>{text}</span>
{/if}

<style lang="postcss">
  a, a:hover, a:visited, a:link {
    color: var(--color-primary-900);
    text-decoration: underline dotted;
  }
</style>