import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCountContainer from "./TodoCountContainer.js";

export default function TodoApp(appEl, items) {
  const inputEl = appEl.querySelector("#new-todo-title");
  const listEl = appEl.querySelector("#todo-list");
  const countContainerEl = appEl.querySelector(".count-container");

  this.items = items;
  this.filter = null;
  this.todoInput = new TodoInput(inputEl, this);
  this.todoList = new TodoList(listEl, this);
  this.todoCountContainer = new TodoCountContainer(countContainerEl, this);

  this.setFilter = function (filter = null) {
    this.filter = filter;
    this.render();
  };

  this.render = function () {
    const filtered = this.items.filter(
      ({ completed }) => this.filter === null || completed === this.filter
    );

    this.todoList.render(filtered);
    this.todoCountContainer.render(filtered);
  };
}
