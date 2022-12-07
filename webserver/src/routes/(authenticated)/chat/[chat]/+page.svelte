<script lang="ts">
  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import { onDestroy } from "svelte";
  import type { ActionData, PageServerData } from "./$types";

  export let data: PageServerData;
  export let form: ActionData;

  $: messages = [...data.chat.messages].reverse();

  if (browser) {
    const ac = new AbortController();
    const signal = ac.signal;

    async function stream() {
      try {
        /* GET request to +server.ts */
        const response = await fetch("/chat/" + $page.params.chat, {
          signal,
        });

        /* get the reader for events */
        const reader = response.body
          ?.pipeThrough(new TextDecoderStream())
          .getReader();

        while (reader) {
          /* read stuff indefinitely */ 
          const { value, done } = await reader.read();
          if (done) break;

          const message = JSON.parse(value);

          /* add the new message */
          if (message) {
            message.timestamp = new Date(message.timestamp.toString());
            messages = [message, ...messages];
          }
        }
        ac.abort();
      } catch (e) {
        console.log("error stream closure");
      }
    }
    stream();

    onDestroy(() => {
      ac.abort();
    });

    // https://kit.svelte.dev/faq#how-do-i-use-a-client-side-only-library-that-depends-on-document-or-window
    /*     if (browser) {
      const interval = setInterval(() => {
        // run load function every sec lol 
        // https://kit.svelte.dev/docs/modules#$app-navigation-invalidateall
        invalidateAll();
      }, 1000);

      onDestroy(() => clearInterval(interval));
    } */
  }
</script>

<h1>Messages</h1>
<hr />
{#if data?.chat}
  <div class="chat">
    {#each messages as message}
      <div class="message" class:own={message.own}>
        <p>
          {message.content}
        </p>
        <i
          >{message.own
            ? message.author?.username + " at "
            : ""}{message.timestamp.toDateString()}</i
        >
        {#if !message.own && !message.liked}
          <form use:enhance method="post" action="?/like">
            <input type="hidden" name="messageId" value={message.id} />
            <button type="submit">like</button>
          </form>
        {:else if !message.own}
          <form use:enhance method="post" action="?/unlike">
            <input type="hidden" name="messageId" value={message.id} />
            <button type="submit">unlike</button>
          </form>
        {/if}
      </div>
    {/each}
  </div>
{/if}

<hr />

<form use:enhance method="post" action="?/write">
  <input type="text" name="message" placeholder="message" id="" />
  <button type="submit">write message</button>
  {#if form?.error}
    {form.error}
  {/if}
</form>

<style>
  .chat {
    display: flex;
    flex-direction: column-reverse;
    max-height: 40vh;
    overflow-y: scroll;
  }

  .message {
    display: flex;
    flex-direction: column;
    gap: 0px;
    margin: 4px;
    padding: 8px;
    background-color: rgba(44, 93, 125, 0.3);
  }

  .message.own {
    place-items: end;
    background-color: rgba(95, 158, 160, 0.3);
  }
</style>
