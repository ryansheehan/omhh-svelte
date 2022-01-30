<script lang="ts">  
  import '../global.css';  
  import AppHeader from '$lib/components/layout/app-header.svelte'; 
  import SideNav from '$lib/components/layout/side-nav.svelte';
  import Footer from '$lib/components/layout/app-footer.svelte';
  import PageWrapper from '$lib/components/layout/page-wrapper.svelte';
</script>

<AppHeader/>

<PageWrapper>
  <slot></slot>
</PageWrapper>

<Footer/>

<SideNav/>

<style lang="postcss" global>
</style>