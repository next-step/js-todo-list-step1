import { todoItemTemplate } from "./TodoItem.js";

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
}
