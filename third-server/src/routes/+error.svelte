<script lang="ts">
    import { page } from '$app/stores';
</script>
<nav>
    <a href="/">Save me</a>
  </nav>
<main>
    <h1>{$page.status}: {$page.error?.message}</h1>
</main>

<style>
    main {
        display: flex;
        /* at least one of these centers the div: dont touch */
        justify-content: center;
        place-content: center;
        place-items: center;
        justify-items: center;
        flex-direction: column;
        min-height: 100vh;
        background-color: brown;
        background-image: url("https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132__340.png");
    }
</style>

