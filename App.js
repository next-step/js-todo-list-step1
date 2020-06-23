import { TodoInput, TodoList, TodoCount, TodoFilter } from './components'
import { ALL, ACTIVE, COMPLETED, STORAGE_KEY } from './utils/constants.js'
import { storage } from './utils/storage.js'

function getTodosByStatus(todos, status) {
  switch (status) {
    case ALL:
      return todos
    case ACTIVE:
      return todos.filter((todo) => todo.isCompleted === false)
    case COMPLETED:
      return todos.filter((todo) => todo.isCompleted === true)
    default:
      throw new Error('Unhandled Case')
  }
}

export default function App() {
  if (new.target !== App) {
    return new App()
  }

  this.init = () => {
    const { onAddTodo, onToggle, onDelete, onEdit, onFilter } = this
    this.todos = storage.get(STORAGE_KEY)
    this.filterStatus = ALL

    new TodoInput({
      selector: '.new-todo',
      onAddTodo
    })

    this.$todoList = new TodoList({
      selector: '.todo-list',
      todos: this.todos,
      onToggle,
      onDelete,
      onEdit,
    })

    this.$todoCount = new TodoCount({
      selector: '.todo-count',
      count: this.todos.length
    })
    new TodoFilter({
      selector: '.filters',
      onFilter
    })
  }

  this.setState = (todos) => {
    storage.set(STORAGE_KEY, todos)
    const renderTodos = getTodosByStatus(todos, this.filterStatus)
    this.$todoList.setState(renderTodos)
    this.$todoCount.setState(renderTodos.length)
  }

  this.onAddTodo = (text) => {
    this.todos = [
      ...this.todos, {
      id: this.todos.length ? Math.max(...this.todos.map((todo) => todo.id)) + 1 : 0,
      text,
      isCompleted: false }
      ]
    this.setState(this.todos, this.filterStatus)
  }

  this.onToggle = (id) => {
    const targetIndex = this.todos.findIndex((todo) => todo.id === id)
    this.todos[targetIndex] = { ...this.todos[targetIndex], isCompleted: !this.todos[targetIndex].isCompleted }
    this.setState(this.todos, this.filterStatus)
  }

  this.onEdit = (id, text) => {
    const targetIndex = this.todos.findIndex((todo) => todo.id === id)
    this.todos[targetIndex] = { ...this.todos[targetIndex], text }
    this.setState(this.todos, this.filterStatus)
  }

  this.onDelete = (id) => {
    this.todos = this.todos.filter((todo) => todo.id !== id)
    this.setState(this.todos, this.filterStatus)
  }

  this.onFilter = (status) => {
    this.filterStatus = status
    this.setState(this.todos)
  }

  this.init()
}
