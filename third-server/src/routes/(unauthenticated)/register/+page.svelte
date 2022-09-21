<script lang="ts">
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<form method="POST" action="?/register">
	<input type="text" name="username" />
	<input type="password" name="password" />
	<button>REGISTER</button>
	{#if form?.success}
		{form?.success}
	{/if}
</form>
