<script>
    import {afterUpdate, onMount} from 'svelte';
    import MultiOptions from './MultiOptions.svelte';
    import MultiInput from './MultiInput.svelte';
    import contextKey from "./MultiApp.svelte";
    import {getContextBound} from "./AppStore";

    export let options;
    export let selector;

    const {optionsStore, isChanged, inputReference, isOpen} = getContextBound(contextKey);

    onMount(() => {
        // noinspection JSUndeclaredVariable
        const renderedOptions = options.map(item => ({value: item, checked: false}))
        optionsStore.set(renderedOptions);
    });


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

    afterUpdate(() => {
        if ($isChanged && !$isOpen) {
            const changeEvent = new Event('change');
            $inputReference.dispatchEvent(changeEvent);
        }
    });

</script>

<svelte:head>
    {#if !isProduction}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css">
    {/if}
</svelte:head>

<div style="position: relative"
     use:clickOutside
     on:clickOutside={()=> isOpen.set(false)}
>
    <MultiInput selector={selector}/>
    <MultiOptions/>
</div>
