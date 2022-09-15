<script lang="ts">
	import type { PageData,ActionData } from './$types';

	export let data: PageData;

	export let form: ActionData;
</script>

<form method="POST" action="?/login">
	<input type="text" name="username" />
	<input type="passowrd" name="password" />
	<button>LOGIN</button>
	{#if form?.message}
		<p>{form?.message}</p>
	{/if}
</form>
