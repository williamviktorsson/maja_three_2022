<script lang="ts">
  import { enhance } from "$app/forms";
	import type { ActionData, PageServerData } from "./$types";

	export let form: ActionData;

</script>

<form use:enhance method="POST" action="?/login">
	<input type="text" name="username" />
	{#if form?.username}
		<p>{form?.username}</p>
	{/if}
	<input type="password" name="password" />
		{#if form?.password}
		<p>{form?.password}</p>
	{/if}
	<button>LOGIN</button>
	{#if form?.user}
		<p>{form?.user}</p>
	{/if}
	{#if form?.server}
		<p>{form?.server}</p>
	{/if}
</form>
