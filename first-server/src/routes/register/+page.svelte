<script>
    /** @type {import('./$types').PageServerData} */
    export let data;

    /**
     * @type any
     */
    export let errors;
</script>

<h1>Registration page</h1>

<h2>Registration status: {data?.registered ? "Registered" : "Pending"}</h2>

<form method="POST">
    <input type="text" name="username" id="" />
    <input type="password" name="password" />
    <button>SIGN UP</button>
    {#if errors?.message}
        <p>{errors.message}</p>
    {/if}
</form>

<style>
    :global(body) {
        background-color: blanchedalmond;
        margin: 0;
    }

    p,
    h1 {
        color: red;
    }
</style>
