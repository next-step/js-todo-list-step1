import { todoItemRender } from "./TodoItem.js";
import { $ } from "../util/util.js";

export default function TodoList({ onClick, onDblClick, onKeyDown }) {
  this.$todoList = $("#todo-list");
  this.todoItems = [];
  this.filter = "all";

  this.setState = (updatedTodoItems, filter) => {
    this.todoItems = updatedTodoItems;
    this.filter = filter;
    this.render();
  };

  this.render = () => {
    const html = this.todoItems.filter(this.itemFiltered).map(todoItemRender);
    this.$todoList.innerHTML = html.join("\n");
  };

  this.$todoList.addEventListener("click", onClick);

  this.$todoList.addEventListener("dblclick", onDblClick);

  this.$todoList.addEventListener("keydown", onKeyDown);

  this.itemFiltered = (item) => {
    if (this.filter === "all") {
      return true;
    } else if (this.filter === "active" && item.status === "view") {
      return true;
    } else if (this.filter === "completed" && item.status === "completed") {
      return true;
    }

    return false;
  };
}
