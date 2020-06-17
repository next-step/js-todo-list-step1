const todo_ul = document.querySelector(".todo-list")
const todo_input = document.querySelector(".new-todo") 
const todo_list = []

function findTodo(li) {
    const label = li.querySelector(".label")
    for (const todo of todo_list) {
        if (todo.todo === label.innerText) {
            return todo
        }
    }
    
}

function todoComplete(event) {
    event.preventDefault()
    const li = event.target.parentElement.parentElement
    todo = findTodo(li)
    if (event.target.checked) {
        li.classList.add("completed")
        todo.complete = true
    } else {
        li.classList.remove("completed")
        todo.complete = false
    }
    console.log(todo_list)
}

function save(current_todo, boolean) {
    todo = {
        'todo': current_todo,
        'complete': boolean
    }
    todo_list.push(todo)
}

function inputTodo(event) {
    event.preventDefault()
    if (event.key === "Enter") {
        current_todo = todo_input.value
        todo_input.value = ""
        drawTodo(current_todo, false)
    }
}

function drawTodo(current_todo, complete) {
    const li = document.createElement("li")
    const div = document.createElement("div")
    const input = document.createElement("input") 
    const label = document.createElement("label")
    const btn = document.createElement("button")
    div.classList.add("view")
    input.classList.add("toggle")
    input.type = "checkbox"
    input.addEventListener("change", todoComplete)
    label.classList.add("label")
    label.innerText = current_todo
    btn.classList.add("destroy")
    if (complete) {
        li.classList.add("completed")
    }
    div.appendChild(input)
    div.appendChild(label)
    div.appendChild(btn)
    li.appendChild(div)
    todo_ul.appendChild(li)
    save(current_todo, complete)
}

function init() {
    todo_input.addEventListener("keyup", inputTodo)
}

init()
