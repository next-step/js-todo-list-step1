import { $ } from '../utils/querySelector.js';

export default class InputView {
  constructor() {
    this.el = $('#new-todo-title');
  }

  setAddEvent(callback) {
    this.el.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        callback(this.el.value);
      }
    });
  }

  clear() {
    this.el.value = '';
  }
}
