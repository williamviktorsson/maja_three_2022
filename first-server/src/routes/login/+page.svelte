<script>
    import { goto } from "$app/navigation";
    import { parse } from "cookie";

    /** @type {import('./$types').PageServerData} */
    export let data;

    /**
     * @type any
     */
    export let errors;
</script>

{#if data.loggedin != true}
    <h1>Login page</h1>

    <form method="POST">
        <input type="text" name="username" id="" />
        <input type="password" name="password" />
        <button>SIGN UP</button>
        {#if errors?.message}
            <p>{errors.message}</p>
        {/if}
    </form>
{:else}
    <h1>Signout page</h1>

    <button
        on:click={() => {
            fetch("/login", { method: "DELETE" }).then(() => {
                location.reload();
            });
        }}>SIGN OUT</button
    >
{/if}
