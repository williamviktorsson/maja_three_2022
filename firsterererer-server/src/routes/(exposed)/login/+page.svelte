<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<form method="POST">
	<input type="text" name="username" id="" />
	<input type="password" name="password" id="" />

	<button>Login</button>
	{#if form?.message}
		<p>{form.message}</p>
	{/if}
</form>
