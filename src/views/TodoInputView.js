import Views from './Views.js';

import { EVENT } from '../utils/constants.js';

export default class TodoInputView extends Views {
  setupInputSubmit() {
    this.$newTodoInput = document.querySelector('#new-todo-title');
    this.init(this.$newTodoInput);
    this.bindSubmitEvent();
    return this;
  }

  resetInputValue() {
    this.$newTodoInput.value = '';
  }

  bindSubmitEvent() {
    this.$newTodoInput.addEventListener(EVENT.EVENT_KEYPRESS, (e) =>
      this.onTodoInputSubmitHandler(e.key)
    );
  }

  onTodoInputSubmitHandler(keyboardKey) {
    if (keyboardKey !== EVENT.ENTER) {
      return;
    }
    this.emit('submitInputTodo', this.$newTodoInput.value);
    this.resetInputValue();
  }
}
