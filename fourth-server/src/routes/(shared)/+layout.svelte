<script>
/** @type {import('./$types').LayoutServerData} */
	export let data;
</script>

<nav>
    {#if data?.userid}
        <a href="/">Home</a>
        <a href="/settings">Settings</a>
    {:else}
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    {/if}

    <a href="/info">Info</a>
    <a href="/support">Support</a>
</nav>

<slot />
