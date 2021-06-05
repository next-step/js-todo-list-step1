export default class TodoList {
  constructor() {

    this.items = [];
  }

  setState(updatedItems) {
    this.items = updatedItems;
    this.render();
  }

  render() {
    console.log('render');
  }
}