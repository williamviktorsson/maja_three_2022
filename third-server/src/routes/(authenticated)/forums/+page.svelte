<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

<h1>Forums</h1>
<hr />
{#each data.forums as forum}
  <p><a href={"/forums/" + forum.id}>{forum.name}</a></p>
{/each}

<hr />

<form use:enhance={(e) => e.form.reset()} method="post" action="?/add">
  <input type="text" name="forumname" placeholder="forum name" id="" />
  <button type="submit">add forum</button>
  {#if form?.error}
    {form.error}
  {/if}
</form>
