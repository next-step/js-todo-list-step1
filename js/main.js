import TodoList from "./TodoList.js";

new TodoList({
  el: document.querySelector("#todo-list"),
  registerEl: document.querySelector("#new-todo-title"),
  counterEl: document.querySelector(".todo-count strong"),
  filters: [
    {
      el: document.querySelector("a.all"),
    },
    {
      el: document.querySelector("a.active"),
      key: "completed",
      value: false,
    },
    {
      el: document.querySelector("a.completed"),
      key: "completed",
      value: true,
    },
  ],
});
