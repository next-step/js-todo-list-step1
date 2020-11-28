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
  let todos = [];
  let id = 0;

  const $todoApp = document.querySelector(".todoapp");
  const $input = $todoApp.querySelector(".new-todo");
  const $list = $todoApp.querySelector(".todo-list");
  const $count = $todoApp.querySelector(".todo-count").querySelector("strong");
  const $filter = $todoApp.querySelector(".filters");

  const SUBMIT_KEY = "Enter";
  const CANCEL_KEY = "Escape";
  const LOCAL_NAME = "TODOS";

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
    if (targetClassList.contains("all")) {
      renderTodo(todos);
    } else if (targetClassList.contains("active")) {
      renderTodo(todos.filter((todo) => !todo.completed));
    } else if (targetClassList.contains("completed")) {
      renderTodo(todos.filter((todo) => todo.completed));
    }
  };

  const handleTodoFiltering = (e) => {
    toggleFilterSelected(e.target);
    filterTodo(e.target.classList);
  };

  const handleEditingTodoSubmit = (e) => {
    if (e.key !== SUBMIT_KEY) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todos.find((todo) => todo.id === todoId);
    targetTodo.text = e.target.value;
    targetTodo.editing = false;
    renderTodo(todos);
  };

  const handleEditingTodoCancel = (e) => {
    if (e.key !== CANCEL_KEY) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todos.find((todo) => todo.id === todoId);
    targetTodo.editing = false;
    renderTodo(todos);
  };

  const handleTodoEdit = (e) => {
    if (!e.target.classList.contains("label")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todos.find((todo) => todo.id === todoId);
    targetTodo.editing = true;
    renderTodo(todos);
  };

  const handleTodoDelete = (e) => {
    if (!e.target.classList.contains("destroy")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const deleteTodoIndex = todos.findIndex((todo) => todo.id === todoId);
    todos.splice(deleteTodoIndex, 1);
    renderTodo(todos);
  };

  const handleTodoToggle = (e) => {
    if (!e.target.classList.contains("toggle")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todos.find((todo) => todo.id === todoId);

    targetTodo.completed = !targetTodo.completed;
    renderTodo(todos);
  };

  const addTodo = (todo) => {
    const newTodo = todoObj(todo);
    todos.push(newTodo);
    renderTodo(todos);
  };

  const handleTodoSubmit = (e) => {
    const todo = $input.value;
    if (todo === "") {
      return;
    }
    if (e.key === SUBMIT_KEY) {
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
    saveStorage(todos);
    countTodo(todoItems);
  };

  const initStorage = () => {
    const todoList = JSON.parse(localStorage.getItem(LOCAL_NAME));
    if (todoList === null) {
      return;
    }
    todos = todoList;
    renderTodo(todoList);
  }

  const saveStorage = (todos) => {
    localStorage.setItem(LOCAL_NAME, JSON.stringify(todos));
    console.log(todos);
  }

  $input.addEventListener("keypress", handleTodoSubmit);
  $list.addEventListener("click", handleTodoToggle);
  $list.addEventListener("click", handleTodoDelete);
  $list.addEventListener("dblclick", handleTodoEdit);
  $list.addEventListener("keydown", handleEditingTodoCancel);
  $list.addEventListener("keydown", handleEditingTodoSubmit);
  $filter.addEventListener("click", handleTodoFiltering);

  initStorage();
}

new app();
