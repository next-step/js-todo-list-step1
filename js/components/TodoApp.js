import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'
import TodoCount from './TodoCount.js'
import TodoStatus from './TodoStatus.js'
import { todoStatus } from '../utils/constant.js'
import { dummyData } from '../utils/dummyData.js'

export default function TodoApp() {
  const onAddTodo = (text) => {
    const newTodos = [...this.todos, { contents: text, isCompleted: false }]

    this.setState(newTodos)
  }

  const onToggleTodo = (id) => {
    const updateTodos = [...this.todos]
    updateTodos[id].isCompleted = !updateTodos[id].isCompleted

    this.setState(updateTodos)
  }

  const onDeleteTodo = (id) => {
    const updateTodos = [...this.todos]
    updateTodos.splice(id, 1)

    this.setState(updateTodos)
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
    this.todoViewStatus = status
    this.setState(this.todos)
  }

  this.setState = function (todos) {
    this.todos = todos
    this.filteredTodos = filteredTodosByStatus(this.todoViewStatus)

    this.todoList.setState(this.filteredTodos)
    this.todoCount.setState(this.filteredTodos)
  }

  this.init = function () {
    this.todos = []
    this.filteredTodos = []
    this.todoViewStatus = todoStatus.ALL

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
