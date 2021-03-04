function todoList() {
  const $input = document.querySelector("#new-todo-title");
  const $todoList = document.querySelector("#todo-list");
  const $todoCount = document.querySelector(".todo-count");
  const title = [];

  const createTodoTemplate = (title) => `
   <li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${title}" />
  </li>`;

  function addTodo(event) {
    if (event.target.value != "" && event.key === "Enter") {
      title.push(event.target.value);
      makeLI();
    }
  }

  function makeLI() {
    let s = title.map((v) => createTodoTemplate(v)).join("");
    $todoList.innerHTML = s;
  }

  function countTodo() {
    let numTodo = $todoList.childElementCount;
    $todoCount.querySelector("strong").innerText = numTodo;
  }

  function deleteItem(event) {
    const target = event.target;
    if (target.classList.contains("destroy")) {
      $todoList.removeChild(newTodoItem);
      countTodo();
    }
  }

  $todoList.addEventListener("click", deleteItem);
  $input.addEventListener("keypress", addTodo);
}
const todoApp = new todoList();
