import TodoList from './components/TodoList.js'
import TodoFilter from './components/TodoFilter.js'
import TodoInput from './components/TodoInput.js'

export default class TodoListApp {
  constructor () {
    this.list = new TodoList()
    this.filter = new TodoFilter() 
    this.input = new TodoInput()

    this.list.render()
    this.filter.render()
    this.input.render()
  }
}