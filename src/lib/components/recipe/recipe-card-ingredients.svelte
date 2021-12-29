<script lang="ts">
  import type { IngredientGroup } from '$lib/sanity';
  import { printFraction } from '$lib/fraction';
  import { scale } from '$lib/store/recipe-scale';

  export let ingredientGroups: IngredientGroup[];
</script>

<h4 class="header">Ingredients</h4>
{#each ingredientGroups as {header, ingredients, key} (key)}
  {#if header}
    <h5 class="sub-header">{header}</h5>
  {/if}
  <ul>
    {#each ingredients as {amount, divisor, displayName, displayModifier='', unit, _key} (_key)}
      <li>{printFraction(amount * $scale.amount, divisor * $scale.divisor)} {unit} <strong>{displayName}</strong>{displayModifier && `, ${displayModifier}`}</li>
    {/each}
  </ul>
{/each}

<style lang="postcss">
  .header, .sub-header, ul {
    padding-bottom: var(--spacing);
  }

  ul:last-of-type {
    padding-bottom: 0;
  }

  ul {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--spacing);
  }
</style>