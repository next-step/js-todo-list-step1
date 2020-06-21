import {checkSelector} from "../utils/validations.js"

export default function TodoList(props) {
  const { selector, todos, onToggle, onDelete } = props
  if (new.target !== TodoList) return new TodoList({selector})
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.todos = todos
    this.bindEvent()
    this.render()
  }

  this.bindEvent = () => {
    this.$target.addEventListener('click', (e) => {
      const li = e.target.closest('li')
      const { id } = li.dataset
      if (e.target.tagName === 'INPUT') {
        onToggle(Number(id))
      } else if (e.target.tagName === 'BUTTON') {
        onDelete(Number(id))
      }
    })
  }

  this.render = () => {
    this.$target.innerHTML = this.todos.map(({id, text, isCompleted}) => {
      return `
        <li data-id=${id} class=${isCompleted ? 'completed' : ''}>
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label class="label">${text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="새로운 타이틀" />
        </li>`
    }).join()
  }

  this.setState = (nextTodos) => {
    this.todos = nextTodos
    this.render()
  }


  this.init()
}

