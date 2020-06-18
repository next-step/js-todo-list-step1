const todo_ul = document.querySelector(".todo-list")
const todo_input = document.querySelector(".new-todo") 
const count_span = document.querySelector(".todo-count")
const filt_ul = document.querySelector(".filters")
const all_a = filt_ul.querySelector(".all")
const active_a = filt_ul.querySelector(".active")
const complete_a = filt_ul.querySelector(".completed")
let todo_list = []
let id = 0

function localTodo() {
    const local_todo = localStorage.getItem("todo_list")
    todo_list = JSON.parse(local_todo)
    if (todo_list.length === 0) {
        todo_list = []
    } else {
        todo_list.forEach(function(todo){
            drawTodo(todo.todo, todo.complete, todo.id)
        })
        countTodo()
        id = todo_list[todo_list.length - 1].id + 1
    }
}

function localSave() {
    localStorage.setItem("todo_list", JSON.stringify(todo_list))
}

function allClear() {
    const li = todo_ul.querySelectorAll("li")
    li.forEach(function(li){
        todo_ul.removeChild(li)
    })
    all_a.classList.remove("selected")
    active_a.classList.remove("selected")
    complete_a.classList.remove("selected")

}

function viewFilt(event) {
    event.preventDefault()
    allClear()
    filtTodo(event.target.classList[0]).forEach(function(todo){
        drawTodo(todo.todo, todo.complete, todo.id)
    })
}

function filtTodo(click_btn) {
    const filt_todo = todo_list.filter(function(todo){
        if (click_btn === "all") {
            all_a.classList.add("selected")
            return true
        } else if (click_btn === "active") {
            active_a.classList.add("selected")
            return !todo.complete
        } else if (click_btn === "completed") {
            complete_a.classList.add("selected")
            return todo.complete
        }
    })
    return filt_todo
}

function countTodo() {
    total_todo = todo_list.length
    count_span.innerText = `총 ${total_todo} 개`
}

function deleteTodo(event) {
    event.preventDefault()
    const li = event.target.parentElement.parentElement
    todo = findTodo(li)
    todo_list.splice(todo_list.indexOf(todo), 1)
    todo_ul.removeChild(li)
    countTodo()
    localSave()
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
        localSave()
    }
}

function editTodo(event) {
    event.preventDefault()
    const li = event.target.parentElement.parentElement
    li.classList.add("editing")
}

function findTodo(li) {
    for (const todo of todo_list) {
        if (todo.id == li.id) {
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
    localSave()
}

function save(current_todo, boolean) {
    todo = {
        'todo': current_todo,
        'complete': boolean,
        "id": id
    }
    id = id + 1
    todo_list.push(todo)
}

function inputTodo(event) {
    event.preventDefault()
    if (event.key === "Enter") {
        current_todo = todo_input.value
        todo_input.value = ""
        drawTodo(current_todo, false, id)
        save(current_todo, false)
        countTodo()
        localSave()
    }
}

function drawTodo(current_todo, complete, id) {
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
    li.id = id
    if (complete) {
        li.classList.add("completed")
        input.checked = "checked"
    }
    div.appendChild(input)
    div.appendChild(label)
    div.appendChild(btn)
    li.appendChild(div)
    li.appendChild(edit_input)
    todo_ul.appendChild(li)
}

function init() {
    todo_input.addEventListener("keyup", inputTodo)
    all_a.addEventListener("click", viewFilt)
    active_a.addEventListener("click", viewFilt)
    complete_a.addEventListener("click", viewFilt)
    localTodo()
}

init()
