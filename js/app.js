const TODO_TEMPLATE = ({ id, text, completed }) => `
<li class="${completed ? "completed" : ""}" id=${id}>
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

  const handleTodoToggle = (e) => {
    if (!e.target.classList.contains("toggle")) {
      return;
    }

    const todoId = e.target.closest("li").id;
    const targetTodo = todos.find((todo) => todo.id === parseInt(todoId));

    targetTodo.completed = !targetTodo.completed;
    renderTodo();
  };

  const todoObj = (todo) => {
    return { id: id++, text: todo, completed: false };
  };

  const addTodo = (todo) => {
    const newTodo = todoObj(todo);
    todos.push(newTodo);
    renderTodo();
  };

  const handleTodoSubmit = (e) => {
    const todo = $input.value;
    if (e.key === SUBMIT_KEY) {
      addTodo(todo);
      $input.value = "";
    }
  };

  const renderTodo = () => {
    const allTodo = todos.map(TODO_TEMPLATE).join("");
    $list.innerHTML = allTodo;
  };

  $todoApp.addEventListener("keypress", handleTodoSubmit);
  $list.addEventListener("click", handleTodoToggle);
}
new app();
