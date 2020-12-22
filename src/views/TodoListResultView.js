import Views from './Views.js';

import { EVENT, CLASS } from '../utils/constants.js';

export default class TodoListResultView extends Views {
  setupRenderResult(todoList) {
    this.$resultTodoList = document.querySelector('#todo-list');
    this.init(this.$resultTodoList);
    this.renderTodoList(todoList);
    return this;
  }

  renderTodoList(todoList) {
    this.$element.innerHTML = this.getTodoListHTML(todoList);
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
          <label class="label">${todoItem.value}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${todoItem.value} />
      </li>`;
  }

  bindClickTodoItemEvent() {
    this.$element.querySelectorAll('.toggle').forEach((checkbox) =>
      checkbox.addEventListener(EVENT.CLICK, (e) => {
        e.stopPropagation();
        this.onToggleTodoItemHandler(e.target);
      })
    );

    this.$element.querySelectorAll('.destroy').forEach((deleteBtn) =>
      deleteBtn.addEventListener(EVENT.CLICK, (e) => {
        e.stopPropagation();
        this.onRemoveTodoItemHandler(e.target);
      })
    );

    this.$element.querySelectorAll('.label').forEach((todoItem) =>
      todoItem.addEventListener(EVENT.DOUBLE_CLICK, (e) => {
        e.stopPropagation();
        this.onEditTodoHandler(e.target);
      })
    );
  }

  onToggleTodoItemHandler(checkboxTag) {
    const targetTodoItemId = checkboxTag.closest('li').id;
    this.emit('changeTodoState', targetTodoItemId);
  }

  onRemoveTodoItemHandler(deleteBtnTag) {
    const targetTodoItemId = deleteBtnTag.closest('li').id;
    this.emit('removeTodoItem', targetTodoItemId);
  }

  onEditTodoHandler(todoItemTag) {
    const todoItem = todoItemTag.closest('li');
    todoItem.classList.add(CLASS.EDIT);
    todoItem.addEventListener(EVENT.EVENT_KEYUP, (e) => {
      if (e.key === EVENT.ENTER) {
        this.onSubmitEditTodoHandler(e.key, todoItem);
      }
      if (e.key === EVENT.ESC) {
        this.onCancelEditTodoHandler(e.key, todoItem);
      }
    });
  }

  onCancelEditTodoHandler(keyboardKey, todoItem) {
    todoItem.classList.remove(CLASS.EDIT);
  }

  onSubmitEditTodoHandler(keyboardKey, todoItem) {
    const targetTodoItem = {
      id: todoItem.id,
      value: todoItem.querySelector('.edit').value,
    };

    this.emit('editTodoItem', targetTodoItem);
  }
}
