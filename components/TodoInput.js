
export default function TodoInput({ title, selector }) {
  if (new.target !== TodoInput) return new TodoInput(selector)
  this.init = () => {
    const $todoInputFragment = document.createDocumentFragment()
    const $div = document.createElement('div')

    const $title = document.createElement('h1')
    $title.innerHTML = 'TODOS'

    this.$input = document.createElement('input')
    this.$input.id = 'new-todo-title'
    this.$input.className = 'new-todo'
    this.$input.placeholder = '할일을 추가해주세요.'
    this.$input.autofocus = true

    $div.appendChild($title)
    $div.appendChild(this.$input)
    $todoInputFragment.appendChild($div)
    const $target = document.querySelector(selector)
    $target.appendChild($todoInputFragment)
  }
  this.init()
}
