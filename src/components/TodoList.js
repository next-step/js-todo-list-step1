import { KEY } from '../constants/constatns.js';

export default class TodoList {
  constructor({ target, removeTodo, toggleTodoItemIsDone, updateTodoItemValue }) {
    this.$target = target;
    this.removeTodo = removeTodo;
    this.toggleTodoItemIsDone = toggleTodoItemIsDone;
    this.updateTodoItemValue = updateTodoItemValue;

    this._addEvent();
  }

  render(todoListState) {
    const todoItemTemplate = todoListState.map(this._getTodoItemTemplate);
    this.$target.innerHTML = todoItemTemplate.join('');
  }

  _addEvent() {
    this.$target.addEventListener('click', this._updateItemIsDone.bind(this));
    this.$target.addEventListener('dblclick', this._changeInputMode.bind(this));
    this.$target.addEventListener('click', this._deleteTodo.bind(this));
    this.$target.addEventListener('keyup', this._closeEditMode.bind(this));
  }

  _deleteTodo({ target }) {
    if (target.classList.value !== 'destroy') return;

    const todoId = target.id;
    this.removeTodo(parseInt(todoId));
  }

  _updateItemIsDone({ target }) {
    if (target.classList.value !== 'toggle') return;
    const todoId = target.id;

    this.toggleTodoItemIsDone(todoId);
  }

  _changeInputMode({ target }) {
    if (target.classList.value !== 'label') return;
    const todoItem = target.closest('li');
    todoItem.classList.add('editing');
  }

  _closeEditMode({ target, key }) {
    if (!(key === KEY.ESC || key === KEY.ENTER)) return;

    const todoItem = target.closest('li');

    const todoId = todoItem.id;
    const updatedValue = todoItem.querySelector('.edit').value;

    if (key === KEY.ESC) {
      todoItem.classList.remove('editing');
      return;
    }

    this.updateTodoItemValue(todoId, updatedValue);
  }

  _getTodoItemTemplate({ id, value, isDone }) {
    return `
    <li id="${id}" class="${isDone && 'completed'}">
      <div class="view">
        <input id="${id}" class="toggle" type="checkbox" ${isDone && 'checked'}/>
        <label class="label">${value}</label>
        <button id="${id}" class="destroy"></button>
      </div>
      <input class="edit" value=${value} />
    </li>
  `;
  }
}
