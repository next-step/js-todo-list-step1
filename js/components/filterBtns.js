import Reilly from "../lib/Reilly.js";
import { BUTTON_NAMES } from "../types/constants.js";

export function filterBtns({ name, mode }) {
  return Reilly.createElement(
    "a",
    {
      className: `${name} ${mode === name && "selected"}`,
      href: "#" + name
    },
    BUTTON_NAMES.get(name)
  );
}
