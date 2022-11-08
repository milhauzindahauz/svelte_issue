<script>
	import {slide, fade} from 'svelte/transition';
	import {quadIn, quintOut} from 'svelte/easing';
    import {getContext} from "svelte";
    import contextKey from "./key";

    const {optionsStore, inputReference, loadOptions, selectedOptions, isOpen} = getContext(contextKey);
	const clickCallback = (e) => {
		const value = e.target.name;
		mutateSelectOptions(value);
	};

	const clickCallbackSelectItem = (e) => {
		const elements = e.target.getElementsByTagName('input');
		if (elements.length === 1) {
			elements[0].click();
		} else if (elements.length > 1) {
			throw Error('Found multiple inputs, investigate!');
		}
	};

	const mutateSelectOptions = (value) => {
		const selectedItem = $optionsStore.find(item => item.value === value);
		const selectedItemIdx = $optionsStore.findIndex(item => item.value === value);
		selectedItem.checked = !selectedItem.checked;
		$optionsStore[selectedItemIdx] = selectedItem;
	};

</script>

{#if $isOpen}
	<ul class="dropdown-menu dropdown-menu-right select-menu"
		in:slide="{{delay: 150, duration: 300, easing: quintOut}}"
		out:fade="{{easing: quadIn, delay: 10, duration: 120}}"
		style="width: {$inputReference.clientWidth}px; left: {!isProduction ? $inputReference.getBoundingClientRect().left : 'auto'}"
	>
		{#each $optionsStore as {value}}
			<li class="select-item"
				on:click={clickCallbackSelectItem}
			>
				<input type="checkbox"
					   on:change={clickCallback}
					   checked={$selectedOptions.includes(value)}
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
