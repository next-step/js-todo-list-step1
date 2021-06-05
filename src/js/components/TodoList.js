import { CLASS_NAME } from "../CONST.js";
import { $ } from "../utils/element.js";
import TodoItemTemplate from "../views/TodoItemTemplate.js";

export default class TodoList {
  constructor() {
    this.$todoList = $(CLASS_NAME.TODO_LIST);
    this.items = [];
  }

  setState(updatedItems) {
    this.items = updatedItems;
    this.render();
  }

  render() {
    this.$todoList.innerHTML = this.items.map(TodoItemTemplate).join('');
  }
}