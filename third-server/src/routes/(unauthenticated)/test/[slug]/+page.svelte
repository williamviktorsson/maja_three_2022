<script lang="ts">
    import { page } from "$app/stores";
</script>

{#if $page.params.slug}
    <h1>{$page.params.slug}</h1>
{/if}

{#if $page.data.test}
    <h1>{$page.data.test}</h1>
{/if}

<style>
    h1 {
        font-size: 72px;
        background: -webkit-linear-gradient(#eee, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
