<script lang="ts">
  export let href: string;
</script>

<h2><a {href}><slot/></a></h2>

<style lang="postcss">
  h2 {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-xl);
    min-width: 8ch;
    text-align: center;
    @media screen and (--laptop-and-larger) {
      font-size: var(--font-size-x2l);
      line-height: var(--line-height-x2l);
    }
  } 

  a, a:hover, a:visited, a:link {
    color: var(--color-black);
    text-decoration: none; 
    
    &:hover {
      text-decoration: underline;
    }
  }
</style>