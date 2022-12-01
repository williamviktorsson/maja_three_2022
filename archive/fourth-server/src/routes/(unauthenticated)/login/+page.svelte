<script>
	/** @type {import('./$types').PageServerData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

{#if data?.test}
	<h1>{data.test}</h1>
{/if}

<form method="POST" action="?/login">
	<input type="text" name="username" />
	<input type="passowrd" name="password" />
	<button>LOGIN</button>
	{#if form?.message}
		<p>{form?.message}</p>
	{/if}
</form>
