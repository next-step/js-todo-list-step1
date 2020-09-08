const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.getElementById("todo-list");
const $todoCount = document.querySelector(".todo-count strong");
const $todoFilter = document.querySelector(".filters");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", onToggleTodoItem);
$todoList.addEventListener("dblclick", onEditTodoItem);
$todoList.addEventListener("keyup", onCancelEditTodoItem);
$todoFilter.addEventListener("click", onFilterTodoList);

function onCountTodoList() {
    $todoCount.innerText = $todoList.childElementCount
}

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    if (event.key === "Enter" && todoTitle !== "") {
        $todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
        onCountTodoList();
    }
}

function onToggleTodoItem(event) {
    if (event.target.classList == "toggle")
        event.target.closest("li").classList.toggle("completed");
    else if (event.target.classList == "destroy") {
        event.target.closest("li").remove();
        onCountTodoList();
    }
}

function onEditTodoItem(event) {
    if (event.target.classList == "label") {
        event.target.closest("li").classList.add("editing");
        event.target.closest("li").lastElementChild.focus();
    }
}

function onCancelEditTodoItem(event) {
    if (event.target.classList == "edit" && event.key == "Escape") {
        event.target.closest("li input").value = event.target.closest("li").querySelector("label").innerText;
        event.target.closest("li").classList.remove("editing");
    }
}

function renderTodoItemTemplate(title) {
    return ` <li>
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${title}">
              </li>`;
}

function onFilterTodoList(event) {
    const selectedFilter = document.querySelector(".filters .selected");
    const allTodoList = document.querySelectorAll(".todo-list li");

    selectedFilter.classList.remove("selected");
    event.target.classList.add("selected");

    if (event.target.classList.contains("all")) {
        allTodoList.forEach(e => {
            e.style.display = "block";
        });
    } else if (event.target.classList.contains("active")) {
        allTodoList.forEach(e => {
            if (e.closest("li").classList == "completed") e.style.display = "none";
            else e.style.display = "block";
        });
    } else if (event.target.classList.contains("completed")) {
        allTodoList.forEach(e => {
            if (e.closest("li").classList != "completed") e.style.display = "none";
            else e.style.display = "block";
        });
    }

}