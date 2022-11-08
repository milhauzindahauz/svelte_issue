<script>
    import createContextKey from "./key";
    import MultiSelect from "./MultiSelect.svelte";
    export let options;
    export let selector;

    export const contextKey = createContextKey();
</script>


<MultiSelect options={options} selector={selector}/>