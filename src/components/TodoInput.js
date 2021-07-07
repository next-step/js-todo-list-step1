export default class TodoInput {
  constructor() {
    this.input = document.querySelector('#new-todo-title"');
    this.input.addEventListener('keyup', () => {
      this.addTodo();
    });
  }
  addTodo() {
    console.loog(1);
  }
}
