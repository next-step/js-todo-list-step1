import { KEY } from "../constants/constatns.js";

export default class TodoInput {
  constructor(todoListState, target) {
    this.todoListState = todoListState;
    this.$target = target;
    this._addEvent();
  }

  _addEvent() {
    this.$target.addEventListener("keyup", this._handleKeyUp.bind(this));
  }

  _handleKeyUp({ code }) {
    if (code === KEY.ENTER) {
      this._todoAdd();
      this._initInput();
    }
  }

  _todoAdd() {
    const todoItemValue = this.$target.value;
    const todoItem = {
      id: this.todoListState.length,
      title: todoItemValue,
      done: false,
    };

    this.todoListState = this.todoListState.concat(todoItem);
  }

  _initInput() {
    this.$target.value = "";
  }
}
