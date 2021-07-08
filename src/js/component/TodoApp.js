import TodoInput from '../component/TodoInput.js'
import TodoList from '../component/TodoList.js'
import TodoCount from '../component/TodoCount.js'

import $ from '../util/QuerySelector.js'

function TodoApp () {
  this.todos = []

  this.handleAddTodo = (todoItem) => {
    const newTodos = this.todos.slice()
    newTodos.push(todoItem)
    this.setState(newTodos)
  }

  this.render = () => {
    this.todoInput = new TodoInput({
      onAddTodo: this.handleAddTodo.bind(this)
    })
    this.todoCount = new TodoCount({
      todos: this.todos
    })
    this.todoList = new TodoList({
      todos: this.todos
    })
  }

  this.setState = (nextState) => {
    this.todos = nextState
    this.todoList.setState(nextState)
    this.todoCount.setState(nextState)
  }

  this.render()
}

export default TodoApp