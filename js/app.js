const todo_ul = document.querySelector(".todo-list")
const todo_input = document.querySelector(".new-todo") 

function inputTodo(event) {
    event.preventDefault()
    if (event.key === "Enter") {
        current_todo = todo_input.value
        todo_input.value = ""
        drawTodo(current_todo)
    }
}

function drawTodo(current_todo) {
    const li = document.createElement("li")
    const div = document.createElement("div")
    const input = document.createElement("input") 
    const label = document.createElement("label")
    const btn = document.createElement("button")
    div.classList.add("view")
    input.classList.add("toggle")
    input.type = "checkbox"
    label.classList.add("label")
    label.innerText = current_todo
    btn.classList.add("destroy")
    div.appendChild(input)
    div.appendChild(label)
    div.appendChild(btn)
    li.appendChild(div)
    todo_ul.appendChild(li)
}

function init() {
    todo_input.addEventListener("keyup", inputTodo)
}

init()