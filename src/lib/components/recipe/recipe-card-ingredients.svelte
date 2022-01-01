<script lang="ts">
  import type { IngredientGroup, FoodData } from '$lib/sanity';
  import { printFraction } from '$lib/fraction';
  import { scale } from '$lib/store/recipe-scale';
  import ExternalLink from '$lib/components/external-link.svelte';

  export let ingredientGroups: IngredientGroup[];

  const ingredientProductMap = new Map<string, string>();
  ingredientGroups.forEach(group => group.ingredients.forEach(ingredient => {
    if(ingredient.food._type === 'food') {
      const food = ingredient.food as FoodData;
      if (food.productSuggestion && food.productSuggestion.productUrl) {
        ingredientProductMap.set(ingredient._key, food.productSuggestion.productUrl);
      }
    }
  }));
</script>

<h4 class="header">Ingredients</h4>
{#each ingredientGroups as {header, ingredients, key} (key)}
  {#if header}
    <h5 class="sub-header">{header}</h5>
  {/if}
  <ul>
    {#each ingredients as {amount, divisor, displayName, displayModifier='', unit, _key} (_key)}
      <li>{printFraction(amount * $scale.amount, divisor * $scale.divisor)} {unit} <strong>
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