import Reilly from "../lib/Reilly.js";
import { FILTER_NAMES } from "../types/constants.js";

export function filterBtns({ name, mode, onModeChange }) {
  return Reilly.createElement(
    "a",
    {
      className: `${name} ${mode === name ? "selected" : ""}`,
      href: "#" + name,
      onclick: onModeChange
    },
    FILTER_NAMES.get(name)
  );
}
