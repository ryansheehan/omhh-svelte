<script lang="ts">
  import Button from '$lib/components/controls/button.svelte';
  import T1Ribbon from '$lib/icons/t1-ribbon.svelte';
  import type { FoodScale } from '$lib/sanity';
  import { scale, Scale } from '$lib/store/recipe-scale';

  export let totalServings: number;
  export let totalWeight: number;
  export let fiber: number;
  export let carbs: number;
  export let foodScale: FoodScale;

  function focusInput(evt) {    
    evt.target.select();
  }

  let servingWeight: number;
  let servingCarbs: number;
  let servingFiber: number;
  let scaledTotalWeight: number;
  let scaledTotalServings: number;
  let scaledFiber: number;
  let scaledCarbs: number;
  let scaleFraction: number;
  
  let hidden = true;

  let cookwareMass = 0;
  let totalWeightWithCookware = 0;
  let amountServed = 0;
  
  let carbsServed = 0;
  let fiberServed = 0;
  let foodWeight = 0;

  let ourKitchen = true;

  let scaleWord: string;

  $: {
    switch($scale.toString()) {
      case(Scale.half): scaleWord = 'half'; break;
      case(Scale.x1): scaleWord = 'single'; break;
      case(Scale.x2): scaleWord = 'double'; break;
      case(Scale.x3): scaleWord = 'triple'; break;
    }
    scaleFraction = $scale.amount / $scale.divisor;
    scaledTotalWeight = totalWeight * scaleFraction;
    scaledTotalServings = totalServings * scaleFraction;
    scaledFiber = fiber * scaleFraction;
    scaledCarbs = carbs * scaleFraction;

    servingCarbs = Math.round(scaledCarbs / scaledTotalServings);
    servingFiber = Math.round(scaledFiber / scaledTotalServings);

    foodWeight = (totalWeightWithCookware || 0) - (cookwareMass || 0);
    let tWeight = ourKitchen ? scaledTotalWeight : foodWeight;
    servingWeight = Math.round(tWeight / scaledTotalServings);
    if (tWeight > 0) {
      carbsServed = Math.round(amountServed * scaledCarbs / tWeight);
      fiberServed = Math.round(amountServed * scaledFiber / tWeight);
    } else {
      carbsServed = 0;
      fiberServed = 0;
    }
  }
</script>

<div class="button-wrapper">  
  <Button on:click={() => hidden = !hidden}><span style="margin-right:1ch"><T1Ribbon width="0.8em"/></span>{hidden ? 'Show Carb Calculator' : 'Hide Carb Calculator'}</Button>
</div>

<div class="carbs-served-wrapper" class:hidden>  
  <div>A <strong>{scaleWord}</strong> batch is <strong>{scaledTotalServings}</strong> servings.</div>  
  <div class="static-data">
    <span class="carb-title">Carbohydrates</span>    
    <span class="fiber-title">Fiber</span>
    <span class="data-label">Total</span>
    <span class="data-value">{Math.round(scaledCarbs)}g</span>
    <span class="data-label">Total</span>
    <span class="data-value">{Math.round(scaledFiber)}g</span>
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
      <span class="input-wrapper"><input type="number" id="cookware-mass" bind:value={cookwareMass} on:focus={focusInput} /></span>
      <label class="data-label" for="total-weight">Food + Dish (g)</label>
      <span class="input-wrapper"><input type="number" id="total-weight" bind:value={totalWeightWithCookware} on:focus={focusInput} /></span>
      <span class="data-label">Net Food Weight</span><span class="data-value">{Math.round(foodWeight)}g</span>
      {/if}
      <span class="data-label">Serving Weight</span>
      <span class="data-value">{servingWeight}g</span>
      <label class="data-label" for="amount-served">Amount Served (g)</label>
      <span class="input-wrapper"><input type="number" id="amount-served" bind:value={amountServed} on:focus={focusInput} /></span>
      <span class="data-label">Carbohydrates served</span>
      <span class="data-value">{carbsServed}g</span>
      <span class="data-label">Fiber served</span>
      <span class="data-value">{fiberServed}g</span>
    </div>
  </div>

  <p class="disclaimer">* The numbers provided are based on calculations from our kitchen using
    nutrition information provided by the United States Department of Agriculture. Variations
    in ingredient brands, humidity, cooking time, heat levels, etc can affect the the final
    weight of the food, and its nutrient density.  
  </p>  

  <div class="recommended-scales">
    <h5>Recommended Scales</h5>
    <div class="food-scale-container">
      <figure class="scale-figure">
        {@html foodScale.nutrition.imageUrl}
        <figcaption>Nutrition Scale</figcaption>
      </figure>
      <figure class="scale-figure">
        {@html foodScale.postal.imageUrl}
        <figcaption>Heavy Weight Scale</figcaption>
      </figure>
    </div>
  </div>
</div>

<style lang="postcss"> 

  .scale-figure {
    display: flex;
    flex-flow: column nowrap;
    gap: 8px;        
    text-align: center;
  }
  .recommended-scales {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--half-element-spacing);
    padding-top: var(--element-spacing);
    background-color: var(--color-white);
    padding-bottom: var(--half-element-spacing);
  }

  .food-scale-container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 32px;    
    padding: 0 16px;
  }

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

    @media screen and (--laptop-and-larger) {
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
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .disclaimer {
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
    text-align: left;    
  }

  label {
    @media screen and (--laptop-and-larger) {
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
    /* max-height: 100vh;
    transition: max-height 0.3s ease;
    overflow: hidden; */

    &.hidden {
      max-height: 0;
      margin-bottom: 0;
      display: none;
    }
  }

  .calculated-table {
    display: grid;
    grid-template-columns: max-content auto;    
    align-items: center;
    justify-content: center;
    row-gap: 4px;
    column-gap: 8px;
    grid-auto-rows: 1fr;

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