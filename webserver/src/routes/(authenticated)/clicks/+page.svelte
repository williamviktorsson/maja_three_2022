<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageServerData } from "./$types";

  export let data: PageServerData;
  export let form: ActionData;

  $: clickies = data.clickies;
</script>

<form use:enhance method="post" action="?/add">
  <button type="submit">ADD CLICKY</button>
</form>

<div class="column">



  {#each clickies as clicks, i}
    <form use:enhance method="post" action="?/click">
      <input type="hidden" name="index" value={i} />
      <button type="submit" class="clicky" style="--multiplier: {clicks / 10}"
        >{clicks}</button
      >
    </form>
  {/each}



  
</div>














{#if form?.error}
  <p>{form?.error}</p>
{/if}

<style>
  :global(body) {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }

  button.clicky {
    height: calc(50px + (0.15 * var(--multiplier) * 50px));
    width: calc(50px + (0.15 * var(--multiplier) * 50px));
    background-color: red;
    border-radius: 100%;

    margin: auto;
    /*Solves a problem in which the content is being cut when the div is smaller than its' wrapper:*/
    max-width: 100%;
    max-height: 100%;
    overflow: clip;
    font-size: xx-large;
  }

  .row {
    display: flex;
    place-items: center;
    place-content: center;
    gap: 16px;
  }

  .column {
    display: grid;
    gap: 16px;
  }

  .shake {
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.5s;

    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% {
      transform: translate(
          calc(var(--multiplier) * 1px),
          calc(var(--multiplier) * 1px)
        )
        rotate(calc(var(--multiplier) * 0deg));
    }
    10% {
      transform: translate(
          calc(var(--multiplier) * -1px),
          calc(var(--multiplier) * -2px)
        )
        rotate(calc(var(--multiplier) * -1deg));
    }
    20% {
      transform: translate(
          calc(var(--multiplier) * -3px),
          calc(var(--multiplier) * 0px)
        )
        rotate(calc(var(--multiplier) * 1deg));
    }
    30% {
      transform: translate(
          calc(var(--multiplier) * 3px),
          calc(var(--multiplier) * 2px)
        )
        rotate(calc(var(--multiplier) * 0deg));
    }
    40% {
      transform: translate(
          calc(var(--multiplier) * 1px),
          calc(var(--multiplier) * -1px)
        )
        rotate(calc(var(--multiplier) * 1deg));
    }
    50% {
      transform: translate(
          calc(var(--multiplier) * -1px),
          calc(var(--multiplier) * 2px)
        )
        rotate(calc(var(--multiplier) * -1deg));
    }
    60% {
      transform: translate(
          calc(var(--multiplier) * -3px),
          calc(var(--multiplier) * 1px)
        )
        rotate(calc(var(--multiplier) * 0deg));
    }
    70% {
      transform: translate(
          calc(var(--multiplier) * 3px),
          calc(var(--multiplier) * 1px)
        )
        rotate(calc(var(--multiplier) * -1deg));
    }
    80% {
      transform: translate(
          calc(var(--multiplier) * -1px),
          calc(var(--multiplier) * -1px)
        )
        rotate(calc(var(--multiplier) * 1deg));
    }
    90% {
      transform: translate(
          calc(var(--multiplier) * 1px),
          calc(var(--multiplier) * 2px)
        )
        rotate(calc(var(--multiplier) * 0deg));
    }
    100% {
      transform: translate(
          calc(var(--multiplier) * 1px),
          calc(var(--multiplier) * -2px)
        )
        rotate(calc(var(--multiplier) * -1deg));
    }
  }
</style>
