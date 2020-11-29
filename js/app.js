import todo from "./todo.js";
import { KEY, FILTER } from "./constants.js";

const TODO_TEMPLATE = ({ id, text, completed, editing }) => `
<li
  class="${completed ? "completed" : ""} ${editing ? "editing" : ""}"
  id=${id}
>
  <div class="view">
    <input class="toggle" type="checkbox" ${completed ? "checked" : ""}/>
    <label class="label">${text}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="${text}" />
</li>
`;

function app() {
  let todos = todo.getItems();
  let id = 0;

  const $todoApp = document.querySelector(".todoapp");
  const $input = $todoApp.querySelector(".new-todo");
  const $list = $todoApp.querySelector(".todo-list");
  const $count = $todoApp.querySelector(".todo-count").querySelector("strong");
  const $filter = $todoApp.querySelector(".filters");

  const todoObj = (todo) => {
    return {
      id: id++,
      text: todo,
      completed: false,
      editing: false,
    };
  };

  const toggleFilterSelected = (target) => {
    const selected = $filter.querySelector(".selected");
    selected.classList.remove("selected");
    target.classList.add("selected");
  };

  const filterTodo = (targetClassList) => {
    if (targetClassList.contains(FILTER.ALL)) {
      renderTodo(todos);
    } else if (targetClassList.contains(FILTER.ACTIVE)) {
      renderTodo(todos.filter((todo) => !todo.completed));
    } else if (targetClassList.contains(FILTER.COMPLETED)) {
      renderTodo(todos.filter((todo) => todo.completed));
    }
  };

  const handleTodoFiltering = (e) => {
    toggleFilterSelected(e.target);
    filterTodo(e.target.classList);
  };

  const handleEditingTodoSubmit = (e) => {
    if (e.key !== KEY.SUBMIT) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    todo.editItem(todoId, e.target.value);
    renderTodo(todos);
  };

  const handleEditingTodoCancel = (e) => {
    if (e.key !== KEY.CANCEL) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todo.findItem(todoId);
    targetTodo.editing = false;
    renderTodo(todos);
  };

  const handleTodoEdit = (e) => {
    if (!e.target.classList.contains("label")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todo.findItem(todoId);
    targetTodo.editing = true;
    renderTodo(todos);
  };

  const handleTodoDelete = (e) => {
    if (!e.target.classList.contains("destroy")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    todo.deleteItem(todoId);
    renderTodo(todos);
  };

  const handleTodoToggle = (e) => {
    if (!e.target.classList.contains("toggle")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    todo.toggleItem(todoId);
    renderTodo(todos);
  };

  const addTodo = (text) => {
    const newTodo = todoObj(text);
    todo.addItem(newTodo);
    renderTodo(todos);
  };

  const handleTodoSubmit = (e) => {
    const todo = $input.value;
    if (todo === "") {
      return;
    }
    if (e.key === KEY.SUBMIT) {
      addTodo(todo);
      $input.value = "";
    }
  };

  const countTodo = (todos) => {
    const length = todos.length;
    $count.innerText = length;
  };

  const renderTodo = (todoItems) => {
    const allTodo = todoItems.map(TODO_TEMPLATE).join("");
    $list.innerHTML = allTodo;
    countTodo(todoItems);
  };

  const init = () => {
    $input.addEventListener("keypress", handleTodoSubmit);
    $list.addEventListener("click", handleTodoToggle);
    $list.addEventListener("click", handleTodoDelete);
    $list.addEventListener("dblclick", handleTodoEdit);
    $list.addEventListener("keydown", handleEditingTodoCancel);
    $list.addEventListener("keydown", handleEditingTodoSubmit);
    $filter.addEventListener("click", handleTodoFiltering);

    renderTodo(todos);
  };
  init();
}

new app();
