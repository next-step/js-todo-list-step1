import {checkSelector} from "./utils/validations.js"
import { TodoInput, TodoList, TodoCount } from './components'

export default function App({ selector }) {
  checkSelector(selector)
  if (new.target !== App) return new App({ selector })
  this.init = () => {
    this.$todoInput = new TodoInput({ title: 'TODOS', selector })
    this.$todoList = new TodoList({ selector })
    this.$todoCount = new TodoCount({ selector })
  }
  this.init()
}
