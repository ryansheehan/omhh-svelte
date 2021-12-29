<script lang="ts">
  import { scale, scaleValues, Scale } from '$lib/store/recipe-scale';
  import { printFraction } from '$lib/fraction';

  export const onChecked = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    const value = (target.value as unknown) as Scale;
    scale.set(value);    
  }

  const inputs = [Scale.half, Scale.x1, Scale.x2, Scale.x3];
</script>

<div>
  {#each inputs as item}
    <input 
      type="radio" 
      name="recipe-scale" 
      value={item} 
      id={item} 
      checked={$scale === scaleValues[item]}
      on:change|preventDefault={onChecked}
    >
    <label class:selected={$scale === scaleValues[item]} for={item}>{printFraction(scaleValues[item])}</label>
  {/each}
</div>

<style lang="postcss">
  div {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-end;
  }

  input {
    display: none;
  }

  label.selected {
    font-weight: bold;
    font-size: 1.2em;    
  }
</style>