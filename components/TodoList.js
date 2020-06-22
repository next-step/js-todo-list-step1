import {checkSelector} from "../utils/validations.js"

export default function TodoList(props) {
  const { selector, todos, onToggle, onDelete, onEdit } = props
  if (new.target !== TodoList) return new TodoList({selector})
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.todos = todos
    this.render()
    this.bindEvent()
  }

  this.bindEvent = () => {
    this.$target.addEventListener('click', (e) => {
      const li = e.target.closest('li')
      const { id } = li.dataset
      if (e.target.tagName === 'INPUT' && e.target.className === 'toggle') {
        onToggle(Number(id))
      } else if (e.target.tagName === 'BUTTON') {
        onDelete(Number(id))
      }
    })

    this.$target.addEventListener('dblclick', (e) => {
      const li = e.target.closest('li')
      if (!li.classList.contains('editing')) {
        li.classList.add('editing')
        const { index } = li.dataset
        const $editInputs = document.querySelectorAll('.edit')
        $editInputs[index].focus()
      }
    })

    this.$target.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') { // ESC
        const li = e.target.closest('li')
        li.classList.remove('editing')
      } else if (e.key === 'Enter' && e.target.value.trim()) {
        const li = e.target.closest('li')
        li.classList.remove('editing')
        onEdit(Number(li.dataset.id), e.target.value.trim()) // id, text
      }
    })
  }

  this.render = () => {
    this.$target.innerHTML = this.todos.map(({id, text, isCompleted}, index) => {
      return `
        <li data-id=${id} data-index=${index} class=${isCompleted ? 'completed' : ''}>
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label class="label">${text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value=${text} />
        </li>`
    }).join()
  }

  this.setState = (nextTodos) => {
    this.todos = nextTodos
    this.render()
  }

  this.init()
}

