const todoApp = document.querySelector(".todoapp");
const todoList = todoApp.querySelector(".todo-list");
const input = todoApp.querySelector("input");

const createTodo = (text) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = text;
    li.appendChild(span);
    todoList.appendChild(li);
}

const handleKeypress = (event) => {
    if (event.key === "Enter" && input.value !== "") {
        const currentValue = input.value;
        createTodo(currentValue);
        input.value = "";
    }
}

function init() {
    input.addEventListener("keypress", handleKeypress);
}

init();

