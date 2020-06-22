import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'
import TodoCount from './TodoCount.js'
import TodoStatus from './TodoStatus.js'
import { todoStatus, TODO_KEY } from '../utils/constant.js'
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../utils/localStorage.js'

export default function TodoApp() {
  const onAddTodo = (text) => {
    this.todos = [...this.todos, { content: text, isCompleted: false }]
    this.setState(this.todos)
  }

  const onToggleTodo = (index) => {
    switch (this.todoViewStatus) {
      case todoStatus.ALL:
        this.todos[index].isCompleted = !this.todos[index].isCompleted
        break

      case todoStatus.ACTIVE:
      case todoStatus.COMPLETED:
        const todoText = this.filteredTodos[index].content
        const findIdx = this.todos.findIndex(
          (todo) => todo.content === todoText
        )
        if (findIdx !== -1) {
          this.todos[findIdx].isCompleted = !this.todos[findIdx].isCompleted
        }
        break
    }
    this.setState(this.todos)
  }

  const onDeleteTodo = (index) => {
    switch (this.todoViewStatus) {
      case todoStatus.ALL:
        this.todos.splice(index, 1)
        break

      case todoStatus.ACTIVE:
      case todoStatus.COMPLETED:
        const todoText = this.filteredTodos[index].content
        const findIdx = this.todos.findIndex(
          (todo) => todo.content === todoText
        )
        if (findIdx !== -1) {
          this.todos.splice(findIdx, 1)
        }
        break
    }
    this.setState(this.todos)
  }

  const onChangeTodo = (text, index) => {
    this.todos[index].content = text
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

  const onSetTodoStatus = (status) => {
    this.todoViewStatus = status
    this.setState(this.todos)
  }

  this.setState = function (todos) {
    this.todos = todos
    setLocalStorageData(TODO_KEY, this.todos)
    this.filteredTodos = filteredTodosByStatus(this.todoViewStatus)

    this.todoList.setState(this.filteredTodos)
    this.todoCount.setState(this.filteredTodos)
  }

  this.init = function () {
    this.todos = getLocalStorageData(TODO_KEY) || []
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
        onChangeTodo,
      })

      this.todoCount = new TodoCount({
        data: this.todos,
        $target: this.$todoCount,
      })

      this.todoStatus = new TodoStatus({
        $target: this.$todoStatus,
        onSetTodoStatus,
      })
    } catch (err) {
      console.log(err)
    }
  }

  this.init()
}
