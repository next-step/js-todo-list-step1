import Views from './Views.js';

import { EVENT } from '../utils/constants.js';

const tag = `[TodoInputView]`;
export default class TodoInputView extends Views {
  setupInputSubmit() {
    console.log(`${tag} setupInputSubmit()`);
    this.$newTodoInput = document.querySelector('#new-todo-title');
    this.init(this.$newTodoInput);
    this.bindSubmitEvent();
    return this;
  }

  resetInputValue() {
    console.log(`${tag} resetInputValue()`);
    this.$newTodoInput.value = '';
  }

  bindSubmitEvent() {
    console.log(`${tag} bindSubmitEvent()`);
    this.$newTodoInput.addEventListener(EVENT.EVENT_KEYPRESS, (e) =>
      this.onTodoInputSubmitHandler(e.key)
    );
  }

  onTodoInputSubmitHandler(keyboardKey) {
    console.log(`${tag} onTodoInputSubmitHandler()`);
    if (keyboardKey !== EVENT.ENTER) {
      return;
    }
    this.emit('submitInputTodo', this.$newTodoInput.value);
    this.resetInputValue();
  }
}
