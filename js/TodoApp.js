import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCountContainer from "./TodoCountContainer.js";

export default function TodoApp(appEl, items) {
  const inputEl = appEl.querySelector("#new-todo-title");
  const listEl = appEl.querySelector("#todo-list");
  const countContainerEl = appEl.querySelector(".count-container");

  this.items = items;
  this.todoInput = new TodoInput(inputEl, this);
  this.todoList = new TodoList(listEl, this);
  this.todoCountContainer = new TodoCountContainer(countContainerEl, this);

  this.render = function () {
    this.todoList.render(this.items);
    this.todoCountContainer.render(this.items);
  };
}
