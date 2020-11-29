import Store from './../store/store.js'

export default class Component {
  constructor (props = {}) {
    let self = this

    this.render = this.render || function () {}

    if (props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () => self.render())
    }

    if (props.hasOnwProperty('element')) {
      this.element = props.element
    }
  }
}