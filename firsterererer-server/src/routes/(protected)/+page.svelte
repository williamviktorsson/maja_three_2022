<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Authenticated</title>
	<meta name="description" />
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<p>
	{data.number}
</p>

<form method="POST">
	<button>CLICK ME</button>
</form>

<form method="POST" action="?/signout">
	<button>LOGOUT</button>
</form>
