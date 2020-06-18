const todo_ul = document.querySelector(".todo-list")
const todo_input = document.querySelector(".new-todo") 
const todo_list = []

function deleteTodo(event) {
    event.preventDefault()
    const li = event.target.parentElement.parentElement
    todo = findTodo(li)
    todo_list.splice(todo_list.indexOf(todo), 1)
    todo_ul.removeChild(li)
}

function editingTodo(event) {
    event.preventDefault()
    const li = event.target.parentElement
    const label = li.querySelector(".label")
    if (event.key === "Escape") {
        li.classList.remove("editing")
        event.target.value = label.innerText
    } else if (event.key === "Enter") {
        todo = findTodo(li)
        label.innerText = event.target.value
        li.classList.remove("editing")
        todo.todo = label.innerText
    }
}

function editTodo(event) {
    event.preventDefault()
    const li = event.target.parentElement.parentElement
    li.classList.add("editing")
}

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
    const edit_input = document.createElement("input") 
    const label = document.createElement("label")
    const btn = document.createElement("button")
    div.classList.add("view")
    input.classList.add("toggle")
    input.type = "checkbox"
    input.addEventListener("change", todoComplete)
    edit_input.classList.add("edit")
    edit_input.value = current_todo
    edit_input.addEventListener("keyup", editingTodo)
    label.classList.add("label")
    label.innerText = current_todo
    label.addEventListener("dblclick", editTodo)
    btn.classList.add("destroy")
    btn.addEventListener("click", deleteTodo)
    if (complete) {
        li.classList.add("completed")
    }
    div.appendChild(input)
    div.appendChild(label)
    div.appendChild(btn)
    li.appendChild(div)
    li.appendChild(edit_input)
    todo_ul.appendChild(li)
    save(current_todo, complete)
}

function init() {
    todo_input.addEventListener("keyup", inputTodo)
}

init()
