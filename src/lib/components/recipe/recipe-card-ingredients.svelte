<script lang="ts">
  import type { IngredientGroup, FoodData } from '$lib/sanity';
  import { printFraction } from '$lib/fraction';
  import { scale } from '$lib/store/recipe-scale';
  import ExternalLink from '$lib/components/external-link.svelte';
  import { convertAmount } from '$lib/units';

  export let ingredientGroups: IngredientGroup[];

  function extractGramsAndProducts(ingredientGroups: IngredientGroup[]) {
    const ingredientGrams = new Map<string, number>();
    const ingredientProductMap = new Map<string, string>();

    ingredientGroups.forEach(group => group.ingredients.forEach(ingredient => {        
      const food = ingredient.food as FoodData;
      const { amount, divisor, unit, modifier} = ingredient;
      const grams = convertAmount({
        amount: amount / divisor,
        fromUnit: unit,
        fromModifier: modifier,
        toUnit: 'g',
        portions: food.portions,
      });

      if (grams) {
        ingredientGrams.set(ingredient._key, grams);
      }
              
      // check to see if the food has an affiliate link
      if (food.productSuggestion && food.productSuggestion.productUrl) {          
        ingredientProductMap.set(ingredient._key, food.productSuggestion.productUrl);
      } 
      
    }));
    
    return { ingredientGrams, ingredientProductMap };
  }

  const {ingredientGrams, ingredientProductMap} = extractGramsAndProducts(ingredientGroups);
</script>

<h4 class="header">Ingredients</h4>
{#each ingredientGroups as {header, ingredients, key} (key)}
  {#if header}
    <h5 class="sub-header">{header}</h5>
  {/if}
  <ul>
    {#each ingredients as {amount, divisor, displayName, displayModifier='', unit, food, _key} (_key)}
      <li>[{_key}] {printFraction(amount * $scale.amount, divisor * $scale.divisor)} {unit} 
        {#if ingredientGrams.has(_key)}
        ({Math.round(ingredientGrams.get(_key) * $scale.amount / $scale.divisor)}g)
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