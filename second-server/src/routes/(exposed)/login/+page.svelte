<script lang="ts">
	export let form: any;
</script>

<form method="POST">
	<input type="text" name="username" id="" />
	<input type="password" name="password" id="" />

	<button>Login</button>
	{#if form?.message}
		<p>{form.message}</p>
	{/if}
</form>
