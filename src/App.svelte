<script>
</script>
<svelte:head>
    {#if import.meta.env.DEV}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" crossorigin="anonymous">
    {/if}
</svelte:head>
<svelte:options tag="workgroup-page"/>
<main>
    <h1 >
        HEADING ON THE WORKGROUP PAGE
    </h1>
    <div class="form-group">

        <input type="text" class="form-control" id="test"/>
        <label for="test">Test Input</label>
    </div>
    <button type=button class="btn btn-danger">
        test
    </button>
</main>

<style>
</style>
