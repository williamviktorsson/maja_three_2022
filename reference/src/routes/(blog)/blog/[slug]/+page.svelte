<!-- src/routes/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<article>
  <h1>{data.title}</h1>
  <p>Published: {data.date}</p>
  <svelte:component this={data.content} />
</article>
