import {checkSelector} from "../utils/validations.js"

export default function TodoInput({ selector, onAddTodo }) {
  if (new.target !== TodoInput) {
    return new TodoInput({ selector, onAddTodo })
  }
  checkSelector(selector)
  this.init = () => {
    this.$target = document.querySelector(selector)
    this.bindEvent()
  }

  this.bindEvent = () => {
    this.$target.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target.value.trim()) {
        onAddTodo(e.target.value)
        e.target.value = ''
      }
    })
  }

  this.init()
}
