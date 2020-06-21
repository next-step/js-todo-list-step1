import {checkSelector} from "../utils/validations.js"

export default function TodoList(props) {
  const {selector, todos} = props
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

    })
  }

  this.render = () => {
    this.$target.innerHTML = this.todos.map(({id, text, isCompleted}) => {
      return `
        <li>
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

