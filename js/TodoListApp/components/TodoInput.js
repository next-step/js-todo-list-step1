import store from './../store/index.js'
import Component from './../lib/component.js'
import { ESC, ENTER } from './../util/keyCode.js'

export default class TodoInput extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#new-todo-title')
    })
  }

  render () {
    let self = this

    self.element.addEventListener('keyup', (ev) => {
      if (ev.code === ESC) {
        ev.target.value = ''
      }

      if (ev.code === ENTER) {
        let targetValue = ev.target.value.trim()
        ev.target.value = ''

        if (!targetValue) return 

        store.dispatch('addItem', targetValue)
      }
    })
    console.log('keyCode', ESC, ENTER)
  }
}