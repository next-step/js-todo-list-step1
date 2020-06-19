import {checkSelector} from "../utils/validations.js"

export default function TodoInput({ selector }) {
  checkSelector(selector)
  if (new.target !== TodoInput) return new TodoInput(selector)
  this.init = () => {
    this.$input = document.createElement('input')
    this.$input.id = 'new-todo-title'
    this.$input.className = 'new-todo'
    this.$input.placeholder = '할일을 추가해주세요.'
    this.$input.autofocus = true
    const $target = document.querySelector(selector)
    console.log(this.$input)
    $target.appendChild(this.$input)
  }
  this.init()
}
