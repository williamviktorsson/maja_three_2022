<script lang="ts">
	import type { ActionData, PageServerData } from "./$types";

	export let data: PageServerData;

	export let form: ActionData;
</script>

<form method="POST" action="?/login">
	<input type="text" name="username" />
	{#if form?.password}
		<p>{form?.password}</p>
	{/if}
	<input type="password" name="password" />
		{#if form?.password}
		<p>{form?.password}</p>
	{/if}
	<button>LOGIN</button>
	{#if form?.user}
		<p>{form?.user}</p>
	{/if}
</form>
