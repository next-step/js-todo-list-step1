import Views from './Views.js';

import { EVENT } from '../utils/constants.js';

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
    this.$todoItemToggleBtn = this.$resultTodoList.querySelector('.toggle');
    this.bindClickTodoItemEvent();
    return this;
  }

  getTodoListHTML(todoList) {
    return todoList.map(this.getOneTodoHTML).join('');
  }

  getOneTodoHTML(todoItem) {
    return `<li id=${todoItem.id} class=${todoItem.complete ? 'completed' : ''}>
        <div class="view">
          <input class="toggle" type="checkbox" ${todoItem.complete ? 'checked' : ''}/>
          <label class="label">${todoItem.name}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀" />
      </li>`;
  }

  bindClickTodoItemEvent() {
    this.$resultTodoList.querySelectorAll('.toggle').forEach((checkbox) =>
      checkbox.addEventListener(EVENT.CLICK, (e) => {
        e.stopPropagation();
        this.onTodoItemToggleHandler(e.target);
      })
    );
  }

  onTodoItemToggleHandler(checkboxTag) {
    console.log(`${tag} onTodoItemToggleHandler()`);
    const targetTodoItemId = checkboxTag.closest('li').id;
    this.emit('changeTodoState', targetTodoItemId);
  }
}
