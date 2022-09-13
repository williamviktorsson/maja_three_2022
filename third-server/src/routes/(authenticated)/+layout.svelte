<script lang="ts">
    import type { LayoutServerData } from "./$types";
    export let data: LayoutServerData;
</script>

<nav>
    <a href="/">Home</a>

    <a href="/settings">Settings</a>

    <a href="/info">Info</a>

    <a href="/support">Support</a>
</nav>
<p>{data?.userid}</p>

<slot />
