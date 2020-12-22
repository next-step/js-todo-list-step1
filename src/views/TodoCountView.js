import Views from './Views.js';

const tag = `[TodoCountView]`;
export default class TodoCountView extends Views {
  setupTodoCount() {
    console.log(`${tag} setupRenderResult()`);
    this.$todoCountContainer = document.querySelector('.count-container');
    this.init(this.$todoCountContainer);
    return this;
  }

  getTodoCountHTML(todoList) {
    this.$element.querySelector('.todo-count > strong').innerText = todoList.todoItems.length;
  }
}
