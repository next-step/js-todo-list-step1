import { todoItemTemplate } from "./TodoItem.js";
import { getClosestTag } from "../util/util.js";

export default function TodoList() {
  this.$todoList = document.querySelector("#todo-list");
  this.todoItems = [];

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join("\n");
  };

  this.$todoList.addEventListener("click", (event) => {
    const itemTag = getClosestTag(event, "li");
    if (
      event.target &&
      event.target.nodeName === "INPUT" &&
      event.target.className === "toggle"
    ) {
      event.target.setAttribute("checked", "");
      itemTag.classList.toggle("completed");
    }
  });
}
