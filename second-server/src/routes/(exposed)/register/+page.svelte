<script lang="ts">
	export let form: any;
</script>

<form method="POST">
	<input type="text" name="username" id="" />
	<input type="text" name="password" id="" />

	<button>Register</button>

	{#if form?.message}
		<p>{form.message}</p>
	{/if}
</form>
