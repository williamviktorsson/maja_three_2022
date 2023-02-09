<script lang="ts">
  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { onDestroy } from "svelte";
  import type { ActionData, PageServerData } from "./$types";
  import "prism-themes/themes/prism-one-dark.css";

  export let data: PageServerData;
  export let form: ActionData;

  $: messages = [...data.chat.messages].reverse();

  if (browser) {
    let events: EventSource;

    events = new EventSource(`/chat/${$page.params.chat}`);
    events.onmessage = (event) => {
      const message = JSON.parse(event.data);

      /* add the new message */
      if (message) {
        message.timestamp = new Date(message.timestamp.toString());
        messages = [message, ...messages];
      }
    };

    onDestroy(() => {
      events.close();
    });
  }
</script>

<h1>Messages</h1>
<hr />
{#if data?.chat}
  <div class="chat">
    {#each messages as message}
      <div class="message" class:own={message.own}>
        <p>
          {@html message.content}
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
  <input type="submit" hidden />
</form>

<style>
  .chat {
    display: flex;
    flex-direction: column-reverse;
    max-height: 60vh;
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

  textarea {
    resize: none;
  }
</style>
