import MultiselectComponent from "./MultiSelect.svelte";

export class MultiSelect {
    constructor(props, target) {
        this.component = new MultiselectComponent(
            props, target
        );
    }
}

window.MultiselectComponent = MultiSelect;


