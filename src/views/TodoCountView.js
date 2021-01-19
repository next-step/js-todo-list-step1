import Views from './Views.js';

export default class TodoCountView extends Views {
  setupTodoCount() {
    this.$todoCountContainer = document.querySelector('.count-container');
    this.init(this.$todoCountContainer);
    return this;
  }

  getTodoCountHTML(todoList) {
    this.$element.querySelector('.todo-count > strong').innerText = todoList.length;
  }
}
