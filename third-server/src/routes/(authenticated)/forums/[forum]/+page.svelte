<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageServerData } from "./$types";

  export let data: PageServerData;
  export let form: ActionData;
</script>

<h1>Messages</h1>
<hr />
{#if data?.messages}
  {#each data?.messages as message}
    <p>{message}</p>
  {/each}
{/if}

<hr />

<form
  use:enhance={({ form }) => {
    form.reset();
  }}
  method="post"
  action="?/write"
>
  <input type="text" name="message" placeholder="message" id="" />
  <button type="submit">write message</button>
  {#if form?.error}
    {form.error}
  {/if}
</form>
