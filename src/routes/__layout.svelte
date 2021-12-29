<script lang="ts">  
  import GlobalCss from '$lib/global-css.svelte';
  import AppHeader from '$lib/components/app-header.svelte'; 
  import SideNav from '$lib/components/side-nav.svelte';
  import Footer from '$lib/components/app-footer.svelte';
  import PageWrapper from '$lib/components/page-wrapper.svelte';
</script>

<GlobalCss/>

<AppHeader/>

<PageWrapper>
  <slot></slot>
</PageWrapper>

<Footer/>

<SideNav/>

<style lang="postcss">

</style>