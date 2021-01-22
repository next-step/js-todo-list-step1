import Reilly from "../lib/Reilly.js";

export function ToggleAll() {
  return Reilly.createElement("input", {
    className: "toggle-all",
    type: "checkbox"
  });
}
