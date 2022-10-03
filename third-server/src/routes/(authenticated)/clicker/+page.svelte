<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  $: clicks = data.clicks;
</script>

<svelte:head>
  <title>{clicks}</title>
</svelte:head>

<form use:enhance method="post" action="?/click">
    <button
      type="submit"
      class:shake={clicks > 0}
      style="--multiplier: {clicks / 10}"
    />
</form>

<style>
  :global(body) {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }

  button {
    height: calc(50px + (0.15 * var(--multiplier) * 50px));
    width: calc(50px + (0.15 * var(--multiplier) * 50px));
    background-color: red;
    border-radius: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    /*Solves a problem in which the content is being cut when the div is smaller than its' wrapper:*/
    max-width: 100%;
    max-height: 100%;
    overflow: clip;
    position: absolute; /*Can also be `fixed`*/
    font-size: xx-large;
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
