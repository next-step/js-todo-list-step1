import {checkSelector} from "../utils/validations"

export default function TodoInput({ selector, onAddTodo }) {
  if (new.target !== TodoInput) return new TodoInput(selector)
  checkSelector(selector)
  this.init = () => {
    this.$input = document.querySelector(selector)
  }

  this.bindEvent = () => {
    this.$input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target.value.trim()) {
        onAddTodo(e.target.value)
      }
    })
  }

  this.init()
}
