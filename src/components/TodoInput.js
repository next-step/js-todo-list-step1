import { KEY } from '../constants/constatns.js';

export default class TodoInput {
  constructor(target, addTodoList) {
    this.$target = target;
    this.addTodoList = addTodoList; // todoList 추가 함수
    this._addEvent();
  }

  _addEvent() {
    this.$target.addEventListener('keyup', this._handleKeyUp.bind(this));
  }

  _handleKeyUp({ code }) {
    if (code !== KEY.ENTER) return;

    // create todo item
    this._todoAdd();
    this._initInput();
  }

  _todoAdd() {
    const todoItemValue = this.$target.value;
    this.addTodoList(todoItemValue);
  }

  _initInput() {
    this.$target.value = '';
  }
}
