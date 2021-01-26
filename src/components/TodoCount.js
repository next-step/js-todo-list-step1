import Observer from '../subjects/Observer.js';

class TodoCount extends Observer {
  constructor() {
    super();
    this.todoCount = document.querySelector('span.todo-count strong');
  }

  init() {
    this.render();
  }

  render() {
    const todos = document.querySelectorAll('ul#todo-list li');
    this.todoCount.innerHTML = [...todos].filter((todo) => todo.style.display !== 'none').length;
  }

  update() {
    this.render();
  }
}

const todoCount = new TodoCount();
todoCount.init();

export default todoCount;
