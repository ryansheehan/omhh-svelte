<script lang="ts">
  import type { IngredientGroup, FoodData } from '$lib/sanity';
  import { printFraction } from '$lib/fraction';
  import { scale } from '$lib/store/recipe-scale';
  import ExternalLink from '$lib/components/external-link.svelte';

  export let ingredientGroups: IngredientGroup[];
  export let ingredientGrams: Map<string, number>;
  export let ingredientProductMap: Map<string, string>;
  export let carbMap = new Map<string, number>();  
  const showCarbMap = false;
</script>

<h4 class="header">Ingredients</h4>
{#each ingredientGroups as {header, ingredients, key} (key)}
  {#if header}
    <h5 class="sub-header">{header}</h5>
  {/if}
  <ul>
    {#each ingredients as {amount, divisor, displayName, displayModifier='', unit, food, _key} (_key)}
      <li>{printFraction(amount * $scale.amount, divisor * $scale.divisor)} {unit} 
        {#if ingredientGrams.has(_key)}
        ({Math.round(ingredientGrams.get(_key) * $scale.amount / $scale.divisor)}g)
        {/if}
        {#if showCarbMap && carbMap.has(_key)}
        [{Math.round((carbMap.get(_key) + Number.EPSILON) * 10) / 10}]
        {/if}
        <strong>
        {#if ingredientProductMap.has(_key)}
        <ExternalLink href={ingredientProductMap.get(_key)}>{displayName}</ExternalLink>
        {:else}
        {displayName}
        {/if}
      </strong>{displayModifier && `, ${displayModifier}`}</li>
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