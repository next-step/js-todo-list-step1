import { ENTER_KEY_CODE } from "../utils/constantsKey.js";

function TodoInput({ onAction }) {
  if (!new.target) throw new Error("error: TodoInput must be called with new!");

  this.$input = document.querySelector("#new-todo-title");
  this.onAction = onAction;

  this.$input.addEventListener("keyup", (e) => {
    const {
      target: { value },
      keyCode,
    } = e;
    if (value && keyCode === ENTER_KEY_CODE) {
      this.onAction.add(value);
      e.target.value = "";
    }
  });
}

export default TodoInput;
