<script lang="ts">
  import type { ActionData } from "./$types";



	export let form: ActionData;
</script>

<form method="POST" action="?/logout">
	<button>LOGOUT</button>
</form>


<form method="POST" action="?/deleteaccount">
	<button>DELETE ACCOUNT</button>
	{#if form?.delete}
		{form?.delete}
	{/if}
</form>
