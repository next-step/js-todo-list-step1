import { TodoInput, TodoList } from './components'

export default function App() {
  if (new.target !== App) return new App()
  this.init = () => {
    const { onAddTodo } = this
    this.todos = []

    new TodoInput({
      selector: '.new-todo',
      onAddTodo
    })
    this.$todoList = new TodoList({
      selector: '.todo-list',
      todos: this.todos,
    })
  }

  this.setState = (todos) => {
    this.$todoList.setState(todos)
  }

  this.onAddTodo = (text) => {
    this.todos = [...this.todos, {
      id: Math.max(...this.todos.map((todo) => todo.id)) + 1,
      text,
      isCompleted: false }]
    this.setState(this.todos)
  }



  this.init()
}
