<script lang="ts">
  import type { LayoutServerData } from "./$types";
  export let data: LayoutServerData;
</script>

<nav>
  <a href="/">Home</a>

  <a href="/settings">Settings</a>

  <a href="/chat">Chat</a>

  <a href="/forums">Forums</a>

  <a href="/clicker">Clicker</a>

  <a href="/blog">Blog</a>
</nav>

<p>{data.name}</p>

<slot />
