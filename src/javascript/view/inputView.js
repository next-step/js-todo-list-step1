import { $ } from '../utils/querySelector.js';

export default class InputView {
  constructor() {
    this._input = $('#new-todo-title');
  }

  setAddEvent(callback) {
    this._input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        callback(this._input.value);
      }
    });
  }

  clear() {
    this._input.value = '';
  }
}
