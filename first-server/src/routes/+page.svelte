<script>
    /** @type {import('./$types').PageServerData} */
    export let data;

    /**
     * @type {import('./$types').Errors}
     */
    export let errors;
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<p>
    {data.number}
</p>

<form method="POST">
    <button>CLICK ME</button>
    {#if errors?.password}
        <p>{errors.password}</p>
    {/if}
</form>
