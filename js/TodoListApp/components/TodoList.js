import store from '../store/index.js'
import Component from '../lib/component.js'
import { ESC, ENTER } from './../util/keyCode.js'

export default class TodoList extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#todo-list')
    })
  }
  render () {
    let self = this;
    self.element.innerHTML = `
      <ul id="todo-list" class="todo-list">
      ${store.getters.filteredItem().map(item => {
        return `
          <li data-id="${item.id}" class="${(item.complete) ? 'completed' : ''}">
            <div class="view">
              <input class="toggle" type="checkbox" ${(item.complete) ? 'checked' : ''} />
              <label class="label">${item.context}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${item.context}" />
          </li>
        `
      }).join('')}
      </ul>
    `
    self.element.addEventListener('click', (ev) => {
      if (ev.target.className === 'destroy') {
        // 본문이 같지만 다른 Todo인 경우가 있을수 있으므로, ID를 사용할 것.
        const parentElement = ev.target.closest('li')
        const id = parentElement.dataset.id
        if (id !== undefined) store.dispatch('deleteItem', Number(id))
      }

      if (ev.target.className === 'toggle') {
        const parentElement = ev.target.closest('li')
        const id = parentElement.dataset.id
        const complete = parentElement.querySelector('.toggle').checked
        if (id !== undefined) store.dispatch('toggleItem', {id:Number(id), complete: complete})
      }
    })

    self.element.addEventListener('dblclick', (ev) => {
      const parentElement = ev.target.closest('li')
      const index = parentElement.className.indexOf('editing')
      if (index < 0) {
        parentElement.className = 'editing'
      } else {
        // parentElement.className = ''
      }
    })
    
    self.element.addEventListener('keyup', (ev) => {
      if (ev.code === ENTER) {
        let targetValue = ev.target.value.trim()
        ev.target.value = ''

        if (!targetValue) {
          store.dispatch('resetItem')
          return
        } 

        const parentElement = ev.target.closest('li')
        const id = parentElement.dataset.id
        const data = {
          id: id,
          context: targetValue
        }
        
        if (targetValue) {
          store.dispatch('updateItem', data)
        }

        return 
      }
      if (ev.code === ESC) {
        let parentElement = ev.target.closest('li')
        parentElement.className = parentElement.className.replace('editing', '')
        store.dispatch('resetItem')

        return
      }
    })
  }
}