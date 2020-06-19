import {checkSelector} from "./utils/validations.js"
import TodoInput from './components/TodoInput.js'

export default function App({ title, selector }) {
  checkSelector(selector)
  if (new.target !== App) return new App({title, selector})
  this.init = () => {
    const $todoInput = new TodoInput({ selector })
  }
  this.init()
}
