import { ENTER_KEY_CODE } from "../utils/constantsKey.js";

function TodoInput(element, { onAdd }) {
  if (!(this instanceof TodoInput)) {
    throw new Error("error: TodoInput must be called with new!");
  }

  this.$input = element;
  this.onAdd = onAdd;

  this.$input.addEventListener("keyup", (e) => {
    const {
      target: { value },
      keyCode,
    } = e;
    if (value && keyCode === ENTER_KEY_CODE) {
      this.onAdd(value);
      e.target.value = "";
    }
  });
}

export default TodoInput;
