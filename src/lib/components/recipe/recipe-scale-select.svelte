<script lang="ts">
  import VisuallyHidden from '$lib/components/controls/visually-hidden.svelte';
  import { scale, scaleValues, Scale } from '$lib/store/recipe-scale';
  import { printFraction } from '$lib/fraction';

  const inputs = [Scale.half, Scale.x1, Scale.x2, Scale.x3];

  let selectedScale: Scale = Scale.x1;

  $: $scale = selectedScale;
</script>

<div>
  {#each inputs as item}
    <VisuallyHidden>
      <input 
        type="radio" 
        name="recipe-scale" 
        value={item} 
        id={item}
        bind:group={selectedScale}
      >
    </VisuallyHidden>
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

  label.selected {
    font-weight: bold;
    font-size: 1.2em;    
  }
</style>