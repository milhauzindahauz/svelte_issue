<script>
    import {getContext} from 'svelte'
    import {fade, slide} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';

    export let isOpen = false;
    export let inputElement = null;

    const optionsStore = getContext('appStore')

    const clickCallback = (e) => {
        const value = e.target.name;
        mutateSelectOptions(value);
    };

    const mutateSelectOptions = (value) => {
        const selectedItem = $optionsStore.find(item => item.value === value);
        const selectedItemIdx = $optionsStore.findIndex(item => item.value === value);
        selectedItem.checked = !selectedItem.checked;
        optionsStore[selectedItemIdx] = selectedItem;

        const selectedOptions = $optionsStore.filter(item => item.checked);

        inputElement.dataset.value = JSON.stringify(selectedOptions.map(item => item.value));
    };

    const clickCallbackSelectItem = (e) => {
        const elements = e.target.getElementsByTagName('input');
        if (elements.length === 1) {
            elements[0].click();
        } else if (elements.length > 1) {
            throw Error('Found multiple inputs, investigate!');
        }
    };
</script>

{#if isOpen}
    <ul class="dropdown-menu dropdown-menu-right select-menu"
        in:slide="{{delay: 150, duration: 300, easing: quintOut}}"
        out:fade="{{delay: 120, duration: 350, easing: quintOut}}"
        style="width: {inputElement !== null ? inputElement.clientWidth : 0}px; left: {(!isProduction && inputElement !== null) ? inputElement.getBoundingClientRect().left : 'auto'}"
    >
        {#each $optionsStore as {value, checked}}
            <li class="select-item" on:click={clickCallbackSelectItem}>
                <input type="checkbox"
                       on:change={clickCallback}
                       bind:checked={checked}
                       value={value}
                       name={value}
                       id={"item-checkbox-" + value}
                />
                <label for={"item-checkbox-" + value}>
                    {value}
                </label>
            </li>
        {/each}
    </ul>
{/if}

<style>
    .select-item {
        padding-left: 2rem;
    }

    .select-item, .select-item:hover * {
        cursor: pointer;
    }

    .select-item:hover {
        background: #EEEEEE;
    }

    .select-item label {
        font-weight: 500;
    }

    .select-menu {
        display: block;
        top: auto;
        right: auto !important;
    }
</style>