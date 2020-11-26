function app() {
  const $todoApp = document.querySelector(".todoapp");
  const $input = $todoApp.querySelector(".new-todo");

  const SUBMIT_KEY = "Enter";

  const addTodo = todo => {};

  const handleTodoSubmit = e => {
    const todo = $input.value;
    if (e.key === SUMBIT_KEY) {
      addTodo(todo);
    }
  };

  $todoApp.addEventListener("keypress", handleTodoSubmit);
}
new app();
