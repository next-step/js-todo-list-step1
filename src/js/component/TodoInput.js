import $ from '../util/QuerySelector.js'

function TodoInput({
  onAddTodo
}) {
  this.onAddTodo = onAddTodo

  this.newTodo = $('.new-todo')

  this.handleAddTodo = () => {
    this.newTodo.addEventListener("keyup", (e) => {
      if(e.keyCode === 13) {
        const todoItem = {
          id: String(Date.now()),
          todo : this.newTodo.value,
          status: "active"
        }
        this.onAddTodo(todoItem)
      }
    })
  }

  this.render = () => {
    this.handleAddTodo()
  }

  this.render()
}

export default TodoInput