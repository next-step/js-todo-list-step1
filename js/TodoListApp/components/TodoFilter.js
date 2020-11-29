import store from './../store/index.js'
import Component from './../lib/component.js'

export default class TodoFilter extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.count-container')
    })
  }

  render () {
    
  }
}