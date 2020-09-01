export default class TodoHeader {
  constructor() {
    this.render();
  }

  render() {
    const todoHeaderElement = document.querySelector('#todo-header');
    todoHeaderElement.innerHTML = `<h1>TODOS</h1>`;
  }
}
