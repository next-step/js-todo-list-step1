const TODO_TEMPLATE = title => `
<li>
  <div class="view">
    <input class="toggle" type="checkbox"/>
    <label class="label">${ title }</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="${ title }" />
</li>
`

function app() {
  const todos = [];

  const $todoApp = document.querySelector(".todoapp");
  const $input = $todoApp.querySelector(".new-todo");
  const $list = $todoApp.querySelector(".todo-list");

  const SUBMIT_KEY = "Enter";

  const addTodo = todo => {
    todos.push(todo);

    const newTodoItem = TODO_TEMPLATE(todo);
    $list.insertAdjacentHTML("beforeend", newTodoItem);
  };

  const handleTodoSubmit = e => {
    const todo = $input.value;
    if (e.key === SUBMIT_KEY) {
      addTodo(todo);
      $input.value = "";
    }
  };

  $todoApp.addEventListener("keypress", handleTodoSubmit);
}
new app();
