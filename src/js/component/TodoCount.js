import $ from '../util/QuerySelector.js'

function TodoCount({
  todos
}) {
  this.todos = todos
  this.todoCountGroup = $('.todo-count') 
  this.todoCount = this.todoCountGroup.querySelector("strong") 

  this.handleCountTodo = () => {
    this.todoCount.textContent = this.todos.length
  }

  this.render = () => {
    this.handleCountTodo()
  }

  this.setState = (nextState) => {
    this.todos = nextState
    this.render()
  }

  this.render()
}

export default TodoCount