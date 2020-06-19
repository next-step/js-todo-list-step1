export default function TodoList({ selector }){
  if (new.target !== TodoList) return new TodoList({ selector })
  this.init = () => {
    const $todoListFragment = document.createDocumentFragment()

    const $div = document.createElement('div')
    $div.className = 'main'

    this.$checkBox = document.createElement('input')
    this.$checkBox.className = 'toggle-all'
    this.$checkBox.type = 'checkbox'

    this.$todoList = document.createElement('ul')
    this.$todoList.id = 'todo-list'
    this.$todoList.className = 'todo-list'

    $div.appendChild(this.$checkBox)
    $div.appendChild(this.$todoList)
    $todoListFragment.appendChild($div)
    const $target = document.querySelector(selector)
    $target.appendChild($todoListFragment)
  }

  this.init()
}
