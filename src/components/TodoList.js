import { KEY, DOM_ID } from '../constants/constatns.js';
import { $ } from '../utils/utils.js';
import TodoState from '../store/todoState.js';

export default class TodoList {
  constructor({ setTodoList }) {
    this.$target = $(DOM_ID.TODO_LIST);

    this.todoState = TodoState;
    this.setTodoList = setTodoList;

    this._addEvent();
  }

  _addEvent() {
    this.$target.addEventListener('click', this._toggleTodoDone.bind(this));
    this.$target.addEventListener('click', this._deleteTodo.bind(this));
    this.$target.addEventListener('dblclick', this._openEditMode.bind(this));
    this.$target.addEventListener('keyup', this._closeEditMode.bind(this));
  }

  _deleteTodo({ target }) {
    if (target.classList.value !== 'destroy') return;

    const todoId = parseInt(target.id);
    const deletedTodoList = TodoState.get().filter((todoItem) => todoItem.id !== todoId);
    this.setTodoList(deletedTodoList);
  }

  _toggleTodoDone({ target }) {
    if (target.classList.value !== 'toggle') return;

    const todoId = parseInt(target.id);
    const updatedTodoList = TodoState.get().map((todoItem) =>
      todoItem.id == todoId ? { ...todoItem, isDone: !todoItem.isDone } : todoItem,
    );

    this.setTodoList(updatedTodoList);
  }

  _updateTodoValue(todoId, updatedValue) {
    const updatedItem = TodoState.get().map((todoItem) => {
      return todoItem.id === todoId ? { ...todoItem, value: updatedValue } : todoItem;
    });

    this.setTodoList(updatedItem);
  }

  _openEditMode({ target }) {
    if (target.classList.value !== 'label') return;

    const todoItem = target.closest('li');
    todoItem.classList.add('editing');
  }

  _closeEditMode({ target, key }) {
    if (!(key === KEY.ESC || key === KEY.ENTER)) return;

    const todoItem = target.closest('li');

    const todoId = parseInt(todoItem.id);
    const updatedValue = todoItem.querySelector('.edit').value;

    if (key === KEY.ESC) {
      todoItem.classList.remove('editing');
      return;
    }

    this._updateTodoValue(todoId, updatedValue);
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

  render(todoListState) {
    const todoItemTemplate = todoListState.map(this._getTodoItemTemplate);
    this.$target.innerHTML = todoItemTemplate.join('');
  }
}
