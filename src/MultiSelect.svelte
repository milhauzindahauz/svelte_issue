<script>
    import {getContext, onMount, setContext} from 'svelte';
    import {derived} from 'svelte/store';
    import Dropdown from './Dropdown.svelte';

    export let options;
    export let selector;
    export let elementWrapper;
    let isOpen = false;

    // reference holder
    let inputElement = null;

    const optionsStore = getContext('appStore');

    onMount(() => {
        // noinspection JSUndeclaredVariable
        optionsStore.set(options.map(item => ({value: item, checked: false})));
    });

    const toggleOpen = (e) => {
        e.preventDefault();
        isOpen = !isOpen;
    };

    const loadData = (e) => {
        const {detail: data} = e;
        inputElement.dataset.value = JSON.stringify(data);
        optionsStore.set($optionsStore.map(item => ({value: item.value, checked: data.includes(item.value)})));
    };

    const clickOutside = (node) => {
        const handleClick = event => {
            if (node && !node.contains(event.target) && !event.defaultPrevented) {
                node.dispatchEvent(
                    new CustomEvent('clickOutside', node)
                );
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    };

    let inputString = derived(optionsStore, (selectedOptions) => {
        selectedOptions = selectedOptions.filter(item => item.checked);
        if (selectedOptions.length > 1) {
            return [selectedOptions.map(item => item.value).slice(0, -1).join(', '), selectedOptions.map(item => item.value).slice(-1)].join(' & ');
        } else {
            return selectedOptions.map(item => item.value).join(', ');

        }
    });


</script>


<svelte:head>
    {#if !isProduction}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css">
    {/if}
</svelte:head>

<div style="position: relative"
     bind:this={elementWrapper}
     use:clickOutside
     on:clickOutside={()=> isOpen = false}
>
    <input bind:value={$inputString}
           bind:this={inputElement}
           on:click={toggleOpen}
           on:loadData={loadData}
           name={selector}
           id={selector}
           class="form-control"
           style="background-color: #ffffff"
           data-type="scalar:multiselect"
           placeholder="Click to select..."
           type="text"
           readonly
    />
    <img alt="arrow caret of a multiselect element"
         src={(isProduction) ? "/static/img/arrow_down.svg":"/img/arrow.svg"}
         class="select-menu-caret"
         class:open={isOpen}
    />
    <Dropdown isOpen={isOpen} inputElement={inputElement}/>

</div>

<style>
    .select-menu-caret {
        overflow: hidden;
        transition-duration: 0.45s;
        transition-property: transform;
        width: 10px;
        height: 10px;
        z-index: 1000;
        position: absolute;
        top: calc(50% - 5px);
        left: calc(100% - 20px);
    }

    .open {
        transform: rotate(180deg);
    }
</style>
