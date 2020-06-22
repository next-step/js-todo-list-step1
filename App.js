import { TodoInput, TodoList, TodoCount } from './components'
import { ALL } from './utils/constants.js'

export default function App() {
  if (new.target !== App) return new App()

  this.init = () => {
    const { onAddTodo, onToggle, onDelete, onEdit } = this
    this.todos = []
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
  }

  this.setState = (todos) => {
    this.$todoList.setState(todos)
    this.$todoCount.setState(todos.length)
  }

  this.onAddTodo = (text) => {
    this.todos = [
      ...this.todos, {
      id: this.todos.length ? Math.max(...this.todos.map((todo) => todo.id)) + 1 : 0,
      text,
      isCompleted: false }
      ]
    this.setState(this.todos)
  }

  this.onToggle = (id) => {
    const targetIndex = this.todos.findIndex((todo) => todo.id === id)
    this.todos = [
      ...this.todos.slice(0, targetIndex),
      {...this.todos[targetIndex], isCompleted: !this.todos[targetIndex].isCompleted},
      ...this.todos.slice(targetIndex + 1, this.todos.length)
    ]
    this.setState(this.todos)
  }

  this.onEdit = (id, text) => {
    const targetIndex = this.todos.findIndex((todo) => todo.id === id)
    this.todos = [
      ...this.todos.slice(0, targetIndex),
      {...this.todos[targetIndex], text},
      ...this.todos.slice(targetIndex + 1, this.todos.length)
    ]
    this.setState(this.todos)
  }

  this.onDelete = (id) => {
    this.todos = this.todos.filter((todo) => todo.id !== id)
    this.setState(this.todos)
  }

  this.init()
}
