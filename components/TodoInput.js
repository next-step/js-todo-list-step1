import { KEYS } from "../utils/constants.js";
import Item from "../models/Item.js";

export default class TodoInput {
  $todoInput;
  onAdd;

  constructor(onAdd) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.onAdd = onAdd;
    this.$todoInput.addEventListener("keypress", this.onKeypress.bind(this));
  }

  genTodoItemId() {
    return `${Date.now().toString(32)}${Math.random().toString(
      32
    )}${Math.random().toString(32)} }`;
  }

  onKeypress(event) {
    if (event.key === KEYS.ENTER) {
      this.onAdd(new Item(this.genTodoItemId(), event.target.value, false));
      event.target.value = "";
    }
  }
}
