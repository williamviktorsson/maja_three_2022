<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<form use:enhance method="POST" action="?/register">
  <input type="text" name="username" />
  <input type="password" name="password" />
  <button>REGISTER</button>
  {#if form?.error}
    {form?.error}
  {/if}
</form>
