const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", function (event) {
    if (event.target.className === "toggle") {
        onToggleTodoItem(event);
    } else if (event.target.className === "destroy") {
        onRemoveTodoItem(event);
    }
});
$todoList.addEventListener("dblclick", function (event) {
    if (event.target.className === "label") {
        onToEditTodoItem(event);
    }
});
$todoList.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        onToViewTodoItem(event);
    } else if (event.key === "Escape") {
        onToEscapeTodoItem(event)
    }
})

function onAddTodoItem(event) {
    let value = event.target.value;

    if (event.key === "Enter" && value !== "") {
        $todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(value));
        event.target.value = "";
    }
};

function onToViewTodoItem(event) {
    let value = event.target.value;

    if (event.key === "Enter" && value !== "") {
        event.target.closest("li").querySelector(".label").textContent = value;
        event.target.closest("li").classList.remove("editing");
    }
}

function onToEscapeTodoItem(event) {
    event.target.value = event.target.closest("li").querySelector(".label").textContent;
    event.target.closest("li").classList.remove("editing");
}

function onToggleTodoItem(event) {
    if (event.target.checked === true) {
        event.target.setAttribute("checked", "checked");
    } else {
        event.target.removeAttribute("checked");
    }
    event.target.closest("li").classList.toggle("completed");
};

function onRemoveTodoItem(event) {
    event.target.closest("li").remove();
};

function onToEditTodoItem(event) {
    const element = event.target.closest("li");
    const old_value = event.target.textContent;

    if (element.className !== "completed") {
        element.classList.add("editing");
        element.querySelector(".edit").setAttribute("value", old_value);
    }
};

function renderTodoItemTemplate(title) {
    return `<li>
              <div class="view">
                  <input class="toggle" type="checkbox">
                  <label class="label">${title}</label>
                  <button class="destroy"></button>
              </div>
              <input class="edit" value="새로운 타이틀">
          </li>`;
};

