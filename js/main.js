function todoList() {
  const $input = document.querySelector("#new-todo-title");
  const $todoList = document.querySelector("#todo-list");
  const $todoCount = document.querySelector(".todo-count");
  let numTodo;

  function addTodo() {
    if (event.target.value != "" && event.key === "Enter") {
    }
  }

  function countTodo() {
    let numTodo = $todoList.childElementCount;
    $todoCount.querySelector("strong").innerText = numTodo;
  }

  $todoList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("destroy")) {
      $todoList.removeChild(newTodoItem);
      countTodo();
    }
  });

  $input.addEventListener("keypress", addTodo);
}
const todoApp = new todoList();
