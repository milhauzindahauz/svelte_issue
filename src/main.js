import MultiselectComponent, {cleanup, getSelectedOptions, setOptions} from "./App.svelte";

export class MultiSelect {
    constructor(props, target) {
        this.component = new MultiselectComponent(
            props, target
        );
    }

    setOptions(options) {
        setOptions(options);
    }

    getSelectedOptions() {
        return getSelectedOptions();
    }

    remove() {
        cleanup();
    }

}

MultiSelect.prototype.destroy = () => {
    cleanup()
}

window.MultiselectComponent = MultiSelect;

