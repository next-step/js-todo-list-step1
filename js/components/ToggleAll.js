import { createElement } from "../lib/Reilly.js";

export function ToggleAll() {
  return createElement("input", {
    className: "toggle-all",
    type: "checkbox"
  });
}
