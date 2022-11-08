import { derived, writable } from "svelte/store";

const state = {
  optionsStore: writable([]),
  loadOptions: writable([]),
  isOpen: writable(false),
  inputReference: writable(null),
};

state["isChanged"] = derived(
  [state.optionsStore, state.loadOptions],
  ([$options, $loadOptions]) => {
    let activeOptions = $options
      .filter((item) => item.checked)
      .map((item) => item.value);
    return !(
      $loadOptions.length === activeOptions.length &&
      $loadOptions.every((v, i) => v === activeOptions[i])
    );
  }
);

state["selectedOptions"] = derived(state.optionsStore, ($options) => {
  return $options.filter((item) => item.checked).map((item) => item.value);
});

state["selectedOptionsString"] = derived(state.optionsStore, ($options) => {
  const selectedOptions = $options.filter((item) => item.checked);
  if (selectedOptions.length > 1) {
    return [
      selectedOptions
        .map((item) => item.value)
        .slice(0, -1)
        .join(", "),
      selectedOptions.map((item) => item.value).slice(-1),
    ].join(" & ");
  } else {
    return selectedOptions.map((item) => item.value).join(", ");
  }
});
export const createStore = () => state;
// get the key
