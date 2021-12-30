<script lang="ts">  
  import '../global.css';  
  import AppHeader from '$lib/components/app-header.svelte'; 
  import SideNav from '$lib/components/side-nav.svelte';
  import Footer from '$lib/components/app-footer.svelte';
  import PageWrapper from '$lib/components/page-wrapper.svelte';
</script>

<AppHeader/>

<PageWrapper>
  <slot></slot>
</PageWrapper>

<Footer/>

<SideNav/>

<style lang="postcss">
  :global {
    @custom-media --tablet-and-larger (min-width: 34.375rem); /* 550px/16=34.375 */
    @custom-media --laptop-and-larger (min-width: 68.75rem);  /* 1100px/16=68.75 */
    @custom-media --desktop-and-larger (min-width: 93.75rem); /* 1500px/16=93.75 */
  }
</style>