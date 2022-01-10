<script lang="ts">
  import Button from '$lib/components/controls/button.svelte';

  export let totalServings: number;
  export let totalWeight: number;
  export let fiber: number;
  export let carbs: number;

  const servingWeight = Math.round(totalWeight / totalServings);
  const servingCarbs = Math.round(carbs / totalServings);
  const servingFiber = Math.round(fiber / totalServings);
  
  let hidden = false;

  let cookwareMass = 0;
  let totalWeightWithCookware = 0;
  let amountServed = 0;
  // $: carbsServed = Math.round(amountServed * carbs / totalWeight);
  // $: fiberServed = Math.round(amountServed * fiber / totalWeight);
  let carbsServed = 0;
  let fiberServed = 0;
  let foodWeight = 0;

  let ourKitchen = true;


  $: {
    foodWeight = (totalWeightWithCookware || 0) - (cookwareMass || 0);
    let tWeight = ourKitchen ? totalWeight : foodWeight;
    if (tWeight > 0) {
      carbsServed = Math.round(amountServed * carbs / tWeight);
      fiberServed = Math.round(amountServed * fiber / tWeight);
    } else {
      carbsServed = 0;
      fiberServed = 0;
    }
  }
</script>

<div class="button-wrapper">  
  <Button on:click={() => hidden = !hidden}>{hidden ? 'Show Carb Calculator' : 'Hide Carb Calculator'}</Button>
</div>

<div class="carbs-served-wrapper" class:hidden>  
  <div class="basic-nutrient-message">Each serving weighs about {servingWeight}g.*<br/></div>
  <div class="static-data">
    <span class="carb-title">Carbohydrates</span>    
    <span class="fiber-title">Fiber</span>
    <span class="data-label">Total</span>
    <span class="data-value">{Math.round(carbs)}g</span>
    <span class="data-label">Total</span>
    <span class="data-value">{Math.round(fiber)}g</span>
    <span class="data-label">Per Serving</span>
    <span class="data-value">{servingCarbs}g</span>
    <span class="data-label">Per Serving</span>
    <span class="data-value">{servingFiber}g</span> 
  </div> 
  <div class="kitchen-data-container">
    <div class="tab-container">
      <div class="tab" class:active-tab={ourKitchen} on:click={() => ourKitchen = true}>Based on results from our kitchen</div>
      <div class="tab" class:active-tab={!ourKitchen} on:click={() => ourKitchen = false}>Based on results from your kitchen</div>
    </div>
    <div class="tab-content calculated-table">
      {#if !ourKitchen}
      <label class="data-label" for="cookware-mass">Empty Dish (g)</label>
      <span class="input-wrapper"><input type="number" id="cookware-mass" bind:value={cookwareMass} /></span>
      <label class="data-label" for="total-weight">Food + Dish (g)</label>
      <span class="input-wrapper"><input type="number" id="amount-served" bind:value={totalWeightWithCookware} /></span>
      <span class="data-label">Net food weight</span><span class="data-value">{Math.round(foodWeight)}g</span>
      {/if}
      <label class="data-label" for="amount-served">Amount Served (g)</label>
      <span class="input-wrapper"><input type="number" id="amount-served" bind:value={amountServed} /></span>
      <span class="data-label">Carbohydrates served</span><span class="data-value">{carbsServed}g</span>
      <span class="data-label">Fiber served</span><span class="data-value">{fiberServed}g</span>
    </div>
  </div>

  <p class="disclaimer">* The numbers provided are based on calculations from our kitchen using
    nutrition information provided by the United States Department of Agriculture. Variations
    in ingredient brands, humidity, cooking time, heat levels, etc can affect the the final
    weight of the food, and its nutrient density.  
  </p>  
</div>

<style lang="postcss"> 
  .kitchen-data-container {
    --remove-margin: calc(-1 * var(--recipe-card-padding));
    margin-left: var(--remove-margin);
    margin-right: var(--remove-margin);    
  }

  .tab-content, .tab {
    background-color: var(--color-primary-100);
  }

  .tab-content {
    padding: var(--element-spacing) var(--recipe-card-padding);    
    min-height: 242px;
  }

  .tab-container {
    display: flex;
  }

  .tab {
    --tab-border: 1px solid var(--color-black);

    flex: 1;    
    text-align: center;
    transition: 0.25s;
    padding: 8px var(--recipe-card-padding);
    border-radius: 8px 8px 0 0;
    border: var(--tab-border);       
    border-left: none;
  
    &:last-child {
      border-right: none;
    }

    @media (--laptop-and-larger) {
      cursor: pointer;
    }

    &:active {
      background-color: var(--color-primary-300);
    }

    &.active-tab {      
      /* background-color: var(--color-primary-100); */
      border-bottom: none;
    }

    &:not(.active-tab) {
      background-color: var(--color-primary-300);
      color: var(--color-primary-800);
    }
  }

  .button-wrapper {    
    display: flex;
    justify-content: center;
    padding-bottom: var(--element-spacing);
  }

  .hidden {
    display: none !important;
  }

  .disclaimer {
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
    text-align: left;    
  }

  label {
    @media (--laptop-and-larger) {
      cursor: pointer;
    }
  }

  input {
    width: 120px;
    text-align: right;
  }

  .carbs-served-wrapper {
    display: flex;
    flex-flow: column nowrap;
    text-align: center;
    gap: var(--half-element-spacing);
    margin-bottom: var(--element-spacing);
  }

  .calculated-table {
    display: grid;
    grid-template-columns: max-content auto;
    align-items: center;
    justify-content: center;
    row-gap: 4px;
    column-gap: 8px;
    grid-auto-rows: min-content;

    &>.data-value {
      text-align: right;
      padding-right: 1ch;
    }
  }

  .static-data {
    display: grid;
    grid-template-columns: repeat(2, max-content 1fr);
    align-items:flex-end;
    justify-items:center;
    row-gap: 2px;
    padding-bottom: var(--half-element-spacing);    
  }

  .data-label {
    text-align: right;
    width: 100%;
    &:after {
      content: ':';
    }
  }

  .carb-title {
    grid-column: 1 / span 2;
  }

  .fiber-title {
    grid-column: 3 / span 2;
  }

  .carb-title, .fiber-title {
    margin-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-black);    
  }
</style>