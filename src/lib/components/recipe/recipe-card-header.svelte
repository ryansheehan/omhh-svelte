<script lang="ts">  
  import SelectScale from './recipe-scale-select.svelte';
  import {scale} from '$lib/store/recipe-scale';

  export let title: string;
  export let description: string;
  export let author: string;
  export let publishDate: string;
  export let dietaryTags: string[];
  export let time: {
    prep: number;
    cook: number;
    total: number;
  };
  export let servings: {
    total: number;
    size: number;
  }
</script>

<h3 class="title">{title}</h3>
<div class="recipe-card-header">
  <div class="description">{description}</div>
  <div class="author-diet-wrapper">
    <span class="label">Author</span><span class="content">{author}<span class="publish-date">{publishDate}</span></span>
    <span class="label">Diet</span><span class="content tags">{dietaryTags.join(', ')}</span>  
  </div>
  <div class="time-serving-wrapper">
    <div class="time-grid">
      <span class="label">Prep</span><span class="content">{time.prep || '-'} min</span>
      <span class="label">Cook</span><span class="content">{time.cook || '-'} min</span>
      <span class="label">Total</span><span class="content">{time.total || '-'} min</span>
    </div>
    <div class="servings-grid">
      <span class="label">Batch</span><span class="content scale-select"><SelectScale/></span>
      <span class="label">Serves</span><span class="content">{Math.floor(servings.total * $scale.amount / $scale.divisor) || '-'}</span>
      <span class="label">Serv Size</span><span class="content">{servings.size ? `${servings.size} g` : '-'}</span>
    </div>
  </div>
</div>

<style lang="postcss">
  .description {
    text-align: center;
    padding-bottom: var(--padding-gap);
  }

  .servings-grid .content, .time-grid .content {
    margin-left: auto;
  }

  .scale-select {
    margin-left: -0ch;
    color: var(--color-primary-900);
    width: 100%;
  }

  .publish-date:before {
    content: '\2022';
    padding: 0 1ch;
  }

  .label {
    padding-right: 1ch;
  }

  .label:after {
    content: ':';
  }

  .servings-grid {    
    border-left: 1px solid black;
    padding-left: 16px;    
  }

  .time-grid {
    padding-right: 16px;
  }

  .time-grid, .servings-grid {
    flex: 1;
    display: grid;
    grid-template-columns: max-content 1fr;
    row-gap: var(--row-gap); 
    
    & > *:nth-child(-n + 2) {
      padding-top: calc(var(--padding-gap));
    }
  }

  /* .time-grid>*:nth-child(-n + 2), .servings-grid>*:nth-child(-n + 2) {
    padding-top: var(--padding-gap);
  } */

  .time-serving-wrapper {
    border-top: 1px solid var(--color-black);
    display: flex;
    flex-flow: row nowrap;
  }

  .author-diet-wrapper {
    border-top: 1px solid var(--color-black);
    padding: var(--padding-gap) 0;
    display: grid;
    grid-template-columns: max-content 1fr;
    row-gap: var(--row-gap);
  }

  .recipe-card-header {
    --padding-gap: 8px;
    --row-gap: 2px;

    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
    padding-left: 24px;
    padding-right: 24px;
  }

  .title {
    text-align: center;
  }
</style>
