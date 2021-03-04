function todoList() {
  const $input = document.querySelector("#new-todo-title");
  const $todoList = document.querySelector("#todo-list");
  const $todoCount = document.querySelector(".todo-count");
  const title = [];
  let index = 0;

  const createTodoTemplate = (title, v) => `
   <li data-id="${v}">
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

  function onClickItem(event) {
    const target = event.target;
    if (target.classList.contains("destroy")) {
      console.log(target);
    }
  }

  $todoList.addEventListener("click", onClickItem);
  $input.addEventListener("keypress", addTodo);
}
const todoApp = new todoList();
