const $todoInput = document.querySelector("#new-todo-title");
const $toggleInput = document.querySelector(".toggle");

$todoInput.addEventListener("keyup", onAddTodoItem);
$toggleInput.addEventListener("click", onToggleTodoItem);

function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.getElementById("todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
    event.target.value = "";
    //console.log(event);

  }
}

function onToggleTodoItem(event) {
  event.target.closest("li").classList.toggle("completed");
  //console.log(event);
}

function renderTodoItemTemplate(title) {
  return ` <li>
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="새로운 타이틀">
           </li>`;
}