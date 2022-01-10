<script context="module">
    // expose components data outside svelte component
    import { options as createOptionsStore } from "store";
    import { get } from "svelte/store";
    let optionsStore = createOptionsStore();

    // references variable
    let elementWrapper;

    export function setOptions(options) {
        optionsStore.set(
            options.map((item) => ({ value: item, checked: false }))
        );
    }

    export function getSelectedOptions() {
        return get(optionsStore)
            .filter((item) => item.checked)
            .map((item) => item.value);
    }

    export function cleanup() {
        return elementWrapper.parentNode.removeChild(elementWrapper);
    }
</script>

<script>
    import { setContext } from "svelte";
    import MultiSelect from "./MultiSelect.svelte";
    setContext("appStore", optionsStore);
    export let options;
    export let selector;
</script>

<MultiSelect elementWrapper={elementWrapper} options={options} selector={selector}/>
