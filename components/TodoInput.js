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
    )}${Math.random().toString(32)}`;
  }

  onKeypress({ key, target }) {
    if (key === KEYS.ENTER) {
      this.onAdd(new Item(this.genTodoItemId(), target.value, false));
      target.value = "";
    }
  }
}
