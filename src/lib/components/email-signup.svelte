<script lang="ts">
  import Button from '$lib/components/button.svelte'
  import Input from '$lib/components/input-text.svelte';
  import { useForm, Hint, required, email } from 'svelte-use-form';
  import { subscribe } from '$lib/subscribe';
  
  export let from: string;

  const form = useForm({
    name: {
      initial: '',
      validators: [required],
    },
    email: {
      initial: '',
      validators: [required, email],
    },    
  });

  enum SubscribeState {
    Idle='idle',
    Submitting='submitting',
    Success='success',
    Error='error'
  }

  let subscribeState = SubscribeState.Idle;
  $: submitting = subscribeState === SubscribeState.Submitting;

  const onSubmit = async () => {
    if($form.touched && $form.valid) {
      const subscriber = {
        name: $form.values.name,
        email: $form.values.email,        
      };
      subscribeState = SubscribeState.Submitting;    

      const {error} = await subscribe(from, subscriber);

      if (error) {
        console.warn(error);
        subscribeState = SubscribeState.Error;
      } else {
        console.info(`${subscriber.name} just subscribed with ${subscriber.email}!`);
        subscribeState = SubscribeState.Success;
      }
      $form.reset();
    }
  }
</script>

<div class="signup-wrapper">
{#if subscribeState === SubscribeState.Success}
  <p>Thank you {$form.values.name} for subscribing to our newsletter!</p>  
{:else}
  <h4>Want more?<br/>Subscribe to stay up to date with the latest!</h4>
  <form use:form on:submit|preventDefault={onSubmit}>
    <label for="name">Name:</label>
    <Input type="text" name="name" id="name" placeholder="First Name" disabled={submitting}/>
    <label for="email">Email:</label>
    <Input type="email" name="email" id="email" placeholder="email@domain.com" disabled={submitting}/>
    <Button class="submit-button" type="submit" disabled={!$form.valid || submitting}>
      {submitting ? 'Submitting...' : 'Subscribe'}
    </Button>
  </form>
  {#if subscribeState === SubscribeState.Error}
    <div>
      <p>We're sorry, but something went wrong while trying to subscribe.</p>
      <p>Please try again later.</p>
    </div>
  {/if}
{/if}
</div>

<style lang="postcss">
  .signup-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--half-element-spacing);
  }
  form {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-items: center;
    align-items: center;
    gap: 8px;
  }

  form :global(.submit-button) {
    grid-column: 1 / span 2;   
    margin-top: 8px;  
    min-width: calc(9ch + (16px * 2));
  }

  h4 {
    text-align: center;
  }
</style>