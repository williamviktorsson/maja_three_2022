<script lang="ts">
    import type { LayoutData } from "./$types";

    export let data: LayoutData;
</script>

{#if data?.id}
    <h1>{data?.id}</h1>
{/if}

<slot />
