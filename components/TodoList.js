import {checkSelector} from "../utils/validations.js"

export default function TodoList(props) {
  const {selector, todos, onToggle, onDelete, onEdit} = props
  if (new.target !== TodoList) {
    return new TodoList(props)
  }
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.todos = todos
    this.$currentEditInput = null
    this.render()
    this.bindEvent()
  }

  this.bindEvent = () => {
    const clickEventHandler = (e) => {
      const li = e.target.closest('li')
      const {id} = li.dataset
      if (e.target.tagName === 'INPUT' && e.target.className === 'toggle') {
        onToggle(Number(id))
      } else if (e.target.tagName === 'BUTTON') {
        onDelete(Number(id))
      }
    }
    const dblclickEventHandler = (e) => {
      const li = e.target.closest('li')
      if (this.$currentEditInput) {
        this.$currentEditInput.classList.remove('editing')
      } // 이미 수정중인 Input이 있다면
      if (!li.classList.contains('editing')) {
        li.classList.add('editing')
        li.querySelector('.edit').focus()
        this.$currentEditInput = li
      }
    }
    const keyUpEventHandler = (e) => {
      if (e.key === 'Escape') { // ESC
        const li = e.target.closest('li')
        li.classList.remove('editing')
        this.$currentEditInput = null
      } else if (e.key === 'Enter' && e.target.value.trim()) {
        const li = e.target.closest('li')
        li.classList.remove('editing')
        onEdit(Number(li.dataset.id), e.target.value.trim()) // id, text
      }
    }
    const focusinEventHandler = (e) => {
      if (e.target.tagName === 'INPUT' && e.target.className === 'edit') {
        e.target.selectionStart = e.target.value.length
      }
    }

    this.$target.addEventListener('click', clickEventHandler)
    this.$target.addEventListener('dblclick', dblclickEventHandler)
    this.$target.addEventListener('keyup', keyUpEventHandler)
    this.$target.addEventListener('focusin', focusinEventHandler) // 맨 마지막 글자에 focus
  }

  const todoItemHTMLTemplate = ({id, text, isCompleted}, index) => {
    return `
      <li data-id=${id} data-index=${index} class=${isCompleted ? 'completed' : ''}>
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">${text}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value=${text} />
      </li>`
  }

  this.render = () => {
    this.$target.innerHTML = this.todos.map(todoItemHTMLTemplate).join()
  }

  this.setState = (nextTodos) => {
    this.todos = nextTodos
    this.render()
  }

  this.init()
}

