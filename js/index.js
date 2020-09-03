const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);


function onAddTodoItem(event) {
    let value = event.target.value;

    if (event.key === "Enter" && value !== "") {
        $todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(value));
    }
};

function onToggleTodoItem(event) {
    if (this.checked === true) {
        this.setAttribute("checked", "checked");
    } else {
        this.removeAttribute("checked");
    }
    event.target.closest("li").classList.toggle("completed");
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

