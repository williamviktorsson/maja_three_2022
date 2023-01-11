<script lang="ts">
  import { enhance } from "$app/forms";
  import "@picocss/pico";
  import { each } from "svelte/internal";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let host: string = "localhost:5173";
  let running: boolean = false;
</script>

<main class="container">
  <h1>Testsvit</h1>
  <hr />
  <div>
    <form
      use:enhance={({ cancel }) => {
        if (running) {
          cancel();
        } else {
          running = true;
        }
        return async ({ update }) => {
          await update({ reset: false });
          running = false;
        };
      }}
      method="post"
      action="?/test"
    >
      <label for="host">IP of server to test:</label>
      <input type="text" bind:value={host} name="host" id="" />
      <button aria-busy={running} type="submit">
        {running ? "" : "RUN TESTS"}
      </button>
    </form>
  </div>
  {#if form?.sqlite}
    <hr />
    <h1>SQLITE RESULTS</h1>
    <hr />
    <ol>
      {#each form.sqlite as result}
        <li>{result}</li>
      {/each}
    </ol>
  {/if}
  {#if form?.mongodb}
    <hr />
    <h1>MONGODB RESULTS</h1>
    <hr />
    <ol>
      {#each form.mongodb as result}
        <li>{result}</li>
      {/each}
    </ol>
  {/if}
  {#if form?.inmemory}
    <hr />
    <h1>INMEMORY RESULTS</h1>
    <hr />
    <ol>
      {#each form.inmemory as result}
        <li>{result}</li>
      {/each}
    </ol>
  {/if}
</main>

<style>
  h1 {
    text-align: center;
  }
</style>
