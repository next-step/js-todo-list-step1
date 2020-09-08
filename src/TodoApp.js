const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.getElementById("todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", onToggleTodoItem);
$todoList.addEventListener("dblclick", onEditTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    if (event.key === "Enter" && todoTitle !== "") {
        $todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
    }
}

function onToggleTodoItem(event) {
    if (event.target.classList == "toggle")
        event.target.closest("li").classList.toggle("completed");
    else if (event.target.classList == "destroy") {
        event.target.closest("li").remove();
    }
}

function onEditTodoItem(event) {
    if (event.target.classList == "label") {
        event.target.closest("li").classList.add("editing");
        event.target.closest("li").lastElementChild.focus();
    }
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