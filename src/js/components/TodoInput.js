import { $ } from "../utils/querySelector.js";
import { EVENT_TYPE, KEY_TYPE } from "../utils/Constants.js";

export function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keyup", (event) => this.addTodoItem(event));

  this.addTodoItem = (event) => {
    let current_input = $todoInput.value;
    if (this.isValid(event, current_input)) {
      event.preventDefault();
      onAdd(current_input);
      $todoInput.value = "";
    }
  };

  this.isValid = (event, value) => {
    return event.key === KEY_TYPE.ENTER && value.length > 0;
  };
}
