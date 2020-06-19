import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'
import TodoCount from './TodoCount.js'
import TodoStatus from './TodoStatus.js'
import { todoStatus } from '../utils/constant.js'

export default function TodoApp() {
  const onAddTodo = (text) => {
    const newTodos = [...this.todos, { contents: text, isCompleted: false }]

    this.todos = newTodos
    this.setState(this.todos)
  }

  const onToggleTodo = (id) => {
    const updateTodos = [...this.todos]
    updateTodos[id].isCompleted = !updateTodos[id].isCompleted

    this.todos = updateTodos
    this.setState(this.todos)
  }

  const onDeleteTodo = (id) => {
    const updateTodos = [...this.todos]
    updateTodos.splice(id, 1)

    this.todos = updateTodos
    this.setState(this.todos)
  }

  const filteredTodosByStatus = (status) => {
    let filteredTodos = []

    switch (status) {
      case todoStatus.ALL:
        filteredTodos = this.todos
        break

      case todoStatus.ACTIVE:
        filteredTodos = this.todos.filter((todo) => todo.isCompleted === false)
        break

      case todoStatus.COMPLETED:
        filteredTodos = this.todos.filter((todo) => todo.isCompleted === true)
        break
    }
    return filteredTodos
  }

  const onGetTodoStatus = (status) => {
    const filteredTodos = filteredTodosByStatus(status)
    this.setState(filteredTodos)
  }

  this.setState = function (todos) {
    this.todoList.setState(todos)
    this.todoCount.setState(todos)
  }

  this.init = function () {
    this.todos = []

    this.$todoInput = document.querySelector('.new-todo')
    this.$todoList = document.querySelector('.todo-list')
    this.$todoCount = document.querySelector('.todo-count > strong')
    this.$todoStatus = document.querySelector('.filters')

    try {
      this.todoInput = new TodoInput({
        $target: this.$todoInput,
        onAddTodo: onAddTodo,
      })

      this.todoList = new TodoList({
        data: this.todos,
        $target: this.$todoList,
        onToggleTodo,
        onDeleteTodo,
      })

      this.todoCount = new TodoCount({
        data: this.todos,
        $target: this.$todoCount,
      })

      this.todoStatus = new TodoStatus({
        $target: this.$todoStatus,
        onGetTodoStatus,
      })
    } catch (err) {
      console.log(err)
    }
  }

  this.init()
}
