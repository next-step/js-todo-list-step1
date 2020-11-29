import todo from "./todo.js";
import filter from "./filter.js";
import { FILTER } from "./constants.js";

import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";

function app() {
  const $todoApp = document.querySelector(".todoapp");
  const $count = $todoApp.querySelector(".todo-count").querySelector("strong");
  const $filter = $todoApp.querySelector(".filters");

  const toggleFilterSelected = (target) => {
    const selected = $filter.querySelector(".selected");
    selected.classList.remove("selected");
    target.classList.add("selected");
  };

  const filterTodo = (targetClassList) => {
    if (targetClassList.contains(FILTER.ALL)) {
      filter.setFilter(FILTER.ALL);
    } else if (targetClassList.contains(FILTER.ACTIVE)) {
      filter.setFilter(FILTER.ACTIVE);
    } else if (targetClassList.contains(FILTER.COMPLETED)) {
      filter.setFilter(FILTER.COMPLETED);
    }
    renderTodo();
  };

  const handleTodoFiltering = (e) => {
    toggleFilterSelected(e.target);
    filterTodo(e.target.classList);
  };

  const countTodo = (todos) => {
    const length = todos.length;
    $count.innerText = length;
  };

  const renderTodo = () => {
    const filteredTodo = todo.filterItems();
    todoList.renderTodoList(filteredTodo);
    countTodo(filteredTodo);
  };

  const init = () => {
    $filter.addEventListener("click", handleTodoFiltering);
    renderTodo();
  };

  new TodoInput(renderTodo);
  const todoList = new TodoList(renderTodo);
  init();
}

new app();
