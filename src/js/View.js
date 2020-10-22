export default class View {
  constructor() {
    this.el = {
      todoList: document.getElementById('todo-list'),
      todoCount: document.getElementsByClassName('todo-count')[0],
      todoInput: document.getElementById('new-todo-title'),
      filters: document.getElementsByClassName('filters')[0],
    }
  }

  countTodos = (todos, type = 'all') => {
    const count = todos.filter((value) => {
      if (type !== 'all') return value.status === type
      else return value
    }).length
    this.el.todoCount.children[0].innerText = count
  }

  makeTodos = (todos, type = 'all') => {
    let html = ''
    for (const value of todos) {
      if (type !== 'all') {
        if (value.status === type) {
          html += `
            <li data-id=${value.id} class=${value.status}>
              <div class="view">
                <input class="toggle" type="checkbox" ${
                  value.status === 'completed' && `checked='true'`
                } />
                <label class="label">${value.title}</label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="새로운 타이틀" />
            </li>
          `
        }
      } else {
        html += `
          <li data-id=${value.id} class=${value.status}>
            <div class="view">
              <input class="toggle" type="checkbox" ${
                value.status === 'completed' && `checked='true'`
              } />
              <label class="label">${value.title}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="새로운 타이틀" />
          </li>
        `
      }
    }

    this.el.todoList.innerHTML = html
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
    this.el.todoList.addEventListener('dblclick', toggleModifyTodo, false)
    this.el.filters.addEventListener('click', filterStatus, false)
    document.body.addEventListener('keydown', modifyTodo, false)
  }

  render = (state, type = 'all') => {
    this.makeTodos(state.todos, type)
    this.countTodos(state.todos, type)
    this.initEvents()
  }
}
