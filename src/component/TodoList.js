import { todoItemRender } from "./TodoItem.js";
import { $ } from "../util/util.js";

export default function TodoList({ onClick, onDblClick, onKeyDown }) {
  this.$todoList = $("#todo-list");
  this.todoItems = [];

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render();
  };

  this.render = () => {
    const html = this.todoItems.map(todoItemRender);
    this.$todoList.innerHTML = html.join("\n");
  };

  this.$todoList.addEventListener("click", onClick);

  this.$todoList.addEventListener("dblclick", onDblClick);

  this.$todoList.addEventListener("keydown", onKeyDown);
}
