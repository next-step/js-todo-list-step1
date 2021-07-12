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

  this.todoTemplate = (item) => {
    return `<li id=${item.id} ${item.status === 'completed' ? "class=completed" : ""}>
              <div class="view">
                <input class="toggle" type="checkbox" id=${item.id} ${item.status === 'completed' ? "class=completed" : "class=checked"} />
                <label class="label">${item.todo}</label>
                <button class="destroy" id="${item.id}"></button>
              </div>
            </li>`
  }
  
  this.handleMapAllTodo = () => {
    this.todos.map(item => {
      this.todoList.insertAdjacentHTML('beforeend', this.todoTemplate(item))
    })
  }

  this.handleMapActiveTodo = () => {
    const todos = this.todos.filter(item => item.status === 'active')
    todos.map(item => {
      this.todoList.insertAdjacentHTML('beforeend', this.todoTemplate(item))
    })
  }

  this.handleMapCompletedTodo = () => {
    const todos = this.todos.filter(item => item.status === 'completed')
    todos.map(item => {
      this.todoList.insertAdjacentHTML('beforeend', this.todoTemplate(item))
    })
  }

  this.mapTodos = (option = STATUS_ALL) => {
    this.todoList.innerHTML = '';

    switch(option) {
      case STATUS_ALL :
        this.handleMapAllTodo()
        break;
      case STATUS_ACTIVE :
        this.handleMapActiveTodo()
        break;
      case STATUS_COMPLETED :
        this.handleMapCompletedTodo()
        break;
    }
  }

  this.toggleTodo = (target) => {
    this.todos.map(item => {
      if(item.id == target.id) {
        if(item.status == "completed") {
          return item.status = "active"
        } else if (item.status == "active") {
          return item.status = "completed"
        }
      }
    })
    // storage.set(this.TODOS_KEY, this.todos)
  }

  this.removeTodo = (target) => {
    this.todos = this.todos.filter(item => {
      if(item.id !== target.id) {
        return item
      }
    })
    // storage.set(this.TODOS_KEY, this.todos)
    this.mapTodos()
  }

  this.handleBindEvents = () => {
    this.filters.addEventListener("click", e => {
      if(e.target.nodeName === 'A') {
        e.target.closest('ul')
                .querySelectorAll('a')
                .forEach((target) => target.classList.remove('selected'))
        e.target.classList.add('selected')
      }
      if(e.target.classList.contains("active")) {
        this.mapTodos(STATUS_ACTIVE)
      } else if(e.target.classList.contains("completed")) {
        this.mapTodos(STATUS_COMPLETED)
      } else if(e.target.classList.contains("all")) {
        this.mapTodos(STATUS_ALL)
      }
    })

    this.todoList.addEventListener("click", e => {
      if(e.target.classList.contains("destroy")) {
        this.removeTodo(e.target)
      } else if(e.target.classList.contains("toggle")) {
        this.toggleTodo(e.target)
      }
    })
  }

  this.render = () => {
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