import store from './../store/index.js'
import Component from './../lib/component.js'

export default class TodoInput extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#new-todo-title')
    })
  }

  render () {
    
  }
}