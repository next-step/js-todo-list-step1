'use strict';

export default class TodoInput {
  constructor() {
    this.$todoInput = document.querySelector('.new-todo');
    this.$todoInput.addEventListener('keyup', this.onKeyUpListener);
  }

  onKeyUpListener = event => {
    if (event.key !== 'Enter' || this.$todoInput.value.trim() === '') return;
    this.onKeyUp && this.onKeyUp(event);
    this.clear();
  };

  setKeyUpListener(onKeyUp) {
    this.onKeyUp = onKeyUp;
  }

  clear() {
    this.$todoInput.value = '';
  }
}
