<script lang="ts">
  import T1Ribbon from '$lib/icons/t1-ribbon.svelte';
  import JDRF from '$lib/icons/jdrf.svelte';
  import ProceedsMessage from '$lib/components/proceeds-message.svelte';
</script>

<div class="supported-orgs-wrapper">
  <T1Ribbon width="80px" />
  <h4>Organizations We Support</h4>
  <p>By supporting Oh My Heart and Home you are helping to support the Type 1 Community.&nbsp;<ProceedsMessage/></p>
  <div class="t1-orgs">
    <a href="https://www.jdrf.org" target="_blank" rel="noopener"><JDRF/></a>
    <a href="https://www.t1international.com" target="_blank" rel="noopener"><img src="/images/t1-international.png" alt="T1 International"/></a>
  </div>
</div>

<style lang="postcss">
  .t1-orgs {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    gap: 24px;
    width: 66%;

    & a {
      width: 100%;      
    }

    &>* {
      flex: 1 1 auto;
    }

    & img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  .supported-orgs-wrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    text-align: center;
    gap: var(--element-spacing);
  }

  p {
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
  }
</style>