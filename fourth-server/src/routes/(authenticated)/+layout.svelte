<script>
    /** @type {import('./$types').LayoutServerData} */
    export let data;
</script>

<nav>
    <a href="/">Home</a>

    <a href="/settings">Settings</a>

    <a href="/info">Info</a>

    <a href="/support">Support</a>
</nav>

<p>Welcome: {data?.userid}</p>

<slot />
