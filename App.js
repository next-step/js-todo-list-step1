import { TodoInput } from './components'

export default function App() {
  if (new.target !== App) return new App()
  this.init = () => {
    const { onAddTodo } = this
    this.todos = []
    new TodoInput({ selector: '.new-todo', onAddTodo })
  }

  this.onAddTodo = (text) => {
    this.todos = [...this.todos, { text, isCompleted: false }]
  }

  this.init()
}
