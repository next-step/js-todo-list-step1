import { $ } from "../utils/querySelector.js";
import { TodoItemTemplate } from "./Template.js";

export function TodoList({ onEditMode, onUpdate }) {
  const $todoList = $("#todo-list");

  this.setState = (updatedTodoItems) => {
    this.render(updatedTodoItems);
  };

  this.render = (items) => {
    console.log(items);
    const template = items.map(TodoItemTemplate);
    $todoList.innerHTML = template.join("");
  };
}
