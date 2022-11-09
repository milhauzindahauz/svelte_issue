<script>
	import {onMount} from 'svelte';
	import contextKey from "./MultiKeyInstance.svelte";
	import {getContextBound} from "./AppStore";

	const {
		optionsStore,
		isChanged,
		inputReference,
		loadOptions,
		selectedOptions,
		selectedOptionsString,
		isOpen
	} = getContextBound(contextKey);

	let elementInput;

	export let selector;

	const toggleOpen = (e) => {
		e.preventDefault();
		isOpen.set(!$isOpen);
	};

	const loadData = (e) => {
		const {detail: data} = e;
		if (data) {
			elementInput.dataset.value = JSON.stringify(data);
			loadOptions.set(data);
			optionsStore.set($optionsStore.map(item => ({value: item.value, checked: data.includes(item.value)})));
		}
	};

	const clearData = () => {
		elementInput.dataset.value = JSON.stringify([]);
		optionsStore.set($optionsStore.map(item => ({...item, checked: false})));
	};

	onMount(() => {
		inputReference.set(elementInput);
	});

    const setDataValue = () => JSON.stringify($selectedOptions)

</script>

<input bind:value={$selectedOptionsString}
	   bind:this={elementInput}
	   on:click={toggleOpen}
	   on:loadData={loadData}
	   on:clearData={clearData}
	   data-value={()=> setDataValue()}
	   class:changed={$isChanged}
	   placeholder="Click to select..."
	   type="text"
	   readonly
	   class="form-control"
	   data-type="scalar:multiselect"
	   name={selector}
	   id={selector}
/>
<img alt="arrow caret of a multiselect element"
	 src={(isProduction) ? "/static/img/arrow_down.svg":"/img/arrow.svg"}
	 class="select-menu-caret"
	 class:open={isOpen}
/>

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

	input:not(.changed) {
		background-color: #ffffff;
	}
</style>
