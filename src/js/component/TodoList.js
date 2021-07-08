import $ from '../util/QuerySelector.js'

const STATUS_ALL = "is-all"
const STATUS_ACTIVE = "is-active"
const STATUS_COMPLETED = "is-completed"

function TodoList ({
  todos
}) {
  this.todoList = $('.todo-list')
  this.filters = $('.filters')
  this.todos = todos
  this.status = STATUS_ALL
  
  let todoStatus

  this.mapTodos = () => {
    switch(this.status) {
      case STATUS_ALL :
        todoStatus = this.todos
        break;
      case STATUS_ACTIVE :
        todoStatus = this.todos.filter(item => item.status === 'active')
        break;
      case STATUS_COMPLETED :
        todoStatus = this.todos.filter(item => item.status === 'completed')
        break;
    }
    return todos
  }

  this.handleMapAllTodo = () => {
    this.todoList.innerHTML = this.todos.map(item => {
      return `<li>
                <div class="view">
                  <input class="toggle" type="checkbox" />
                  <label class="label">${item.todo}</label>
                  <button class="destroy"></button>
                </div>
                <input class="edit" value="${item.todo}" />
              </li>`
    }).join('')
  }

  this.handleMapActiveTodo = () => {
    const todos = this.todos.filter(item => item.status === 'active')
    this.todoList.innerHTML = todos.map(item => {
      return `<li>
                <div class="view">
                  <input class="toggle" type="checkbox" />
                  <label class="label">${item.todo}</label>
                  <button class="destroy"></button>
                </div>
                <input class="edit" value="${item.todo}" />
              </li>`
    }).join('')
  }

  this.handleMapCompletedTodo = () => {
    const todos = this.todos.filter(item => item.status === 'completed')
    this.todoList.innerHTML = todos.map(item => {
      return `<li>
                <div class="view">
                  <input class="toggle" type="checkbox" />
                  <label class="label">${item.todo}</label>
                  <button class="destroy"></button>
                </div>
                <input class="edit" value="${item.todo}" />
              </li>`
    }).join('')
  }

  this.handleCheckTodo = () => {

  }

  this.handleDelTodo = () => {

  }

  this.handleBindEvents = () => {
    this.filters.addEventListener("click", e => {
      if(e.target.className == 'active') {
        this.status = STATUS_ACTIVE
      } else if(e.target.className == 'completed') {
        this.status = STATUS_COMPLETED
      }
    })

    this.todoList.addEventListener("click", e => {
      if(e.target.className == "destroy") {
        console.log("삭제")
      } else if(e.target.className == "toggle") {
        console.log("checkbox")
      }
    })
  }

  this.render = () => {
    this.handleMapList()
    this.handleBindEvents()
    this.mapTodos()
  }

  this.setState = (nextState) => {
    this.todos = nextState
    this.render()
  }

  this.render()
}

export default TodoList