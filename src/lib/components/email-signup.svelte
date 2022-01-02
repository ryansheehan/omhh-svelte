<script lang="ts">
  import Button from '$lib/components/button.svelte'
  import Input from '$lib/components/input-text.svelte';

  function onSubmit(evt: Event) {
    const formData = new FormData(evt.target as HTMLFormElement);
    const formValue: Record<string,unknown> = { }
    formData.forEach((value, key) => formValue[key] = value);

    console.log(formValue);
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <label for="name">Name:</label>
  <Input type="text" name="name" id="name" placeholder="Jane"/>
  <label for="email">Email:</label>
  <Input type="email" name="email" id="email" placeholder="name@place.com"/>  
  <Button class="submit-button" type="submit">Subscribe</Button>
</form>

<style lang="postcss">
  form {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-items: center;
    align-items: center;
    gap: 8px;
  }

  form :global(.submit-button) {
    grid-column: 1 / span 2;     
  }
</style>