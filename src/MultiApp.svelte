<script>
    import {createStore} from "./AppStore";
    import createContextKey from "./key";
    import {setContext} from "svelte";
    import MultiSelect from "./MultiSelect.svelte";
    export let options;
    export let selector;

    export const contextKey = createContextKey();
    setContext(contextKey, createStore());
</script>


<MultiSelect options={options} selector={selector}/>