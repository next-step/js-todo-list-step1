import Observer from '../subjects/Observer.js';
import todosData from '../model/TodosModel.js';

class TodoCount extends Observer {
  constructor() {
    super();
    this.todoCount = document.querySelector('span.todo-count strong');
  }

  init() {
    this.render();
  }

  render() {
    this.todoCount.innerHTML = Object.keys(todosData.data).length;
  }

  update() {
    this.render();
  }
}

const todoCount = new TodoCount();
todoCount.init();

export default todoCount;
