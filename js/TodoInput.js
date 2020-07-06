import { keyMap } from "../utils/constants.js";

export default function TodoInput(params) {
  const { $target, onKeyEnter } = params;

  $target.addEventListener("keydown", (e) => {
    if (e.key === keyMap.ENTER && $target.value) {
      onKeyEnter($target.value);
      $target.value = "";
    }
  });
}
