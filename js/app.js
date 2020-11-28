const TODO_TEMPLATE = ({ id, text, completed, editing }) => `
<li class="${completed ? "completed" : ""} ${editing ? "editing" : ""}" id=${id}>
  <div class="view">
    <input class="toggle" type="checkbox" ${completed ? "checked" : ""}/>
    <label class="label">${text}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="${text}" />
</li>
`;

function app() {
  const todos = [];
  let id = 0;

  const $todoApp = document.querySelector(".todoapp");
  const $input = $todoApp.querySelector(".new-todo");
  const $list = $todoApp.querySelector(".todo-list");

  const SUBMIT_KEY = "Enter";
  const CANCEL_KEY = "Escape";

  const todoObj = (todo) => {
    return { id: id++, text: todo, completed: false, editing: false };
  };

  const handleEditingTodoSubmit = (e) => {
    if (e.key !== SUBMIT_KEY) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todos.find((todo) => todo.id === todoId);
    targetTodo.text = e.target.value;
    targetTodo.editing = false;
    renderTodo();
  }

  const handleEditingTodoCancel = e => {
    if (e.key !== CANCEL_KEY) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todos.find((todo) => todo.id === todoId);
    targetTodo.editing = false;
    renderTodo();
  }

  const handleTodoEdit = (e) => {
    if (!e.target.classList.contains("label")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todos.find((todo) => todo.id === todoId);
    targetTodo.editing = true;
    renderTodo();
  }

  const handleTodoDelete = e => {
    if (!e.target.classList.contains("destroy")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const deleteTodoIndex = todos.findIndex(todo => todo.id === todoId);
    todos.splice(deleteTodoIndex, 1);
    renderTodo();
  }

  const handleTodoToggle = (e) => {
    if (!e.target.classList.contains("toggle")) {
      return;
    }

    const todoId = parseInt(e.target.closest("li").id);
    const targetTodo = todos.find((todo) => todo.id === todoId);

    targetTodo.completed = !targetTodo.completed;
    renderTodo();
  };

  const addTodo = (todo) => {
    const newTodo = todoObj(todo);
    todos.push(newTodo);
    renderTodo();
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

  const renderTodo = () => {
    const allTodo = todos.map(TODO_TEMPLATE).join("");
    $list.innerHTML = allTodo;
  };

  $input.addEventListener("keypress", handleTodoSubmit);
  $list.addEventListener("click", handleTodoToggle);
  $list.addEventListener("click", handleTodoDelete);
  $list.addEventListener("dblclick", handleTodoEdit);
  $list.addEventListener("keydown", handleEditingTodoCancel);
  $list.addEventListener("keydown", handleEditingTodoSubmit);
}

new app();
