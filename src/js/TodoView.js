export default class TodoView {
  constructor() {
    this.defaultType = 'all'
    this.el = {
      todoList: document.getElementById('todo-list'),
      todoCount: document.getElementsByClassName('todo-count')[0],
      todoInput: document.getElementById('new-todo-title'),
      filters: document.getElementsByClassName('filters')[0],
    }
  }

  countTodos = (todos, type = this.defaultType) => {
    const count = todos.filter((value) => {
      return type === this.defaultType ? value : value.status === type
    }).length
    this.el.todoCount.children[0].innerText = count
  }

  makeTodos = (todos, type = this.defaultType) => {
    const filterTodos = todos
      .filter((todo) =>
        type === this.defaultType ? todo : todo.status === type
      )
      .map((todo) => {
        return `<li data-id=${todo.id} class=${todo.status}>
        <div class="view">
          <input class="toggle" type="checkbox" ${
            todo.status === 'completed' && `checked='true'`
          } />
          <label class="label">${todo.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀" />
      </li>`
      })

    this.el.todoList.innerHTML = filterTodos.join('')
  }

  initEvents = () => {
    const {
      addTodo,
      removeTodo,
      completeTodo,
      toggleModifyTodo,
      filterStatus,
      modifyTodo,
    } = this.controllerEvents

    this.el.todoInput.addEventListener('keydown', addTodo, false)
    this.el.todoList.addEventListener('click', removeTodo, false)
    this.el.todoList.addEventListener('click', completeTodo, false)
    this.el.todoList.addEventListener('click', toggleModifyTodo, false)
    this.el.filters.addEventListener('click', filterStatus, false)
    document.body.addEventListener('keydown', modifyTodo, false)
  }

  render = (state, type = this.defaultType) => {
    if (state.todos.length) {
      this.makeTodos(state.todos, type)
      this.countTodos(state.todos, type)
    }
    this.initEvents()
  }
}
