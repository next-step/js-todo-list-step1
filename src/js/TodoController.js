import faker from 'faker'

export default class TodoController {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.controllerEvents = {
      addTodo: this.addTodo,
      removeTodo: this.removeTodo,
      completeTodo: this.completeTodo,
      toggleModifyTodo: this.toggleModifyTodo,
      filterStatus: this.filterStatus,
      modifyTodo: this.modifyTodo,
    }
  }

  addTodo = (e) => {
    const { state, setState } = this.model
    const { el, render } = this.view

    if (e.key === 'Enter' && el.todoInput.value) {
      const newTodos = [...state.todos]
      newTodos.push({
        id: faker.random.uuid(),
        title: el.todoInput.value,
        status: 'active',
      })

      setState({
        todos: newTodos,
      })
      render(this.model.state)
      el.todoInput.value = ''
      this.saveTodos()
    }
  }

  removeTodo = (e) => {
    const { state, setState } = this.model
    const { render } = this.view
    if (e.target.classList.contains('destroy')) {
      const id = e.target.closest('li').dataset.id
      const newTodos = state.todos.filter((value) => value.id !== id)

      setState({
        todos: newTodos,
      })
      render(this.model.state)
      this.saveTodos()
    }
  }

  completeTodo = (e) => {
    const { state, setState } = this.model
    const { render } = this.view

    const filterStatusByChecked = (id, status) => {
      return state.todos.map((todo) => {
        if (todo.id === id) todo.status = status
        return todo
      })
    }

    const getTodoTypeByChecked = (isChecked) =>
      isChecked ? 'completed' : 'active'

    const [type] = document.querySelector('.selected').className.split(' ')

    if (e.target.classList.contains('toggle')) {
      const id = e.target.closest('li').getAttribute('data-id')

      setState({
        todos: filterStatusByChecked(
          id,
          getTodoTypeByChecked(e.target.checked)
        ),
      })

      render(this.model.state, type)
      this.saveTodos()
    }
  }

  toggleModifyTodo = (e) => {
    if (!document.querySelector('.editing')) {
      e.target.closest('li').classList.add('editing', 'active')
    }
  }

  modifyTodo = (e) => {
    const { state, setState } = this.model
    const { render } = this.view

    const changeValue = (id, title) => {
      return [...state.todos].map((value) => {
        if (value.id === id) value.title = title
        return value
      })
    }

    const [type] = document.querySelector('.selected').className.split(' ')

    if (!document.querySelector('.editing')) {
      return
    }

    if (e.key === 'Escape') {
      document.querySelector('.editing').classList.remove('editing')
    }

    if (e.key === 'Enter') {
      const id = document.querySelector('.editing').getAttribute('data-id')
      const [editElement] = document
        .querySelector('.editing')
        .getElementsByClassName('edit')

      setState({
        todos: changeValue(id, editElement.value),
      })

      render(this.model.state, type)
      this.saveTodos()
    }
  }

  filterStatus = (e) => {
    const { render } = this.view
    if (e.target.tagName === 'A') {
      const [type] = e.target.className.split(' ')
      const selected = document.querySelector('.selected')

      if (selected) {
        selected.classList.remove('selected')
        e.target.classList.add('selected')
      }

      render(this.model.state, type)
    }
  }

  saveTodos() {
    const { state } = this.model
    localStorage.setItem('todos', JSON.stringify(state.todos))
  }

  getTodos() {
    const todos = localStorage.getItem('todos')
    return todos ? JSON.parse(todos) : []
  }

  init() {
    const { setState } = this.model
    const { render } = this.view
    const todos = this.getTodos()

    setState({ todos })
    render(this.model.state)
  }
}
