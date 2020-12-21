import Views from './Views.js';

const tag = `[TodoInputView]`;
export default class TodoInputView extends Views {
  setupRenderResult(todoList) {
    console.log(`${tag} setupRenderResult()`);
    this.$resultTodoList = document.querySelector('#todo-list');
    this.init(this.$resultTodoList);
    this.renderTodoList(todoList);
    return this;
  }

  renderTodoList(todoList) {
    this.$resultTodoList.innerHTML = this.getTodoListHTML(todoList);
  }

  getTodoListHTML(todoList) {
    return todoList.map(this.getOneTodoHTML).join('');
  }

  getOneTodoHTML(todoItem) {
    return `<li class=${todoItem.complete ? 'complete' : ''} id=${todoItem.id}>
        <div class="view">
          <input class="toggle" type="checkbox"/>
          <label class="label">${todoItem.name}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀" />
      </li>`;
  }
}
