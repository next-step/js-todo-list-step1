import {KEY} from './constants.js';

export default function TodoInput($todoInput, addItem) {
  if (!$todoInput) {
    throw new Error('ERROR: Invalid object');
  }

  this.$todoInput = $todoInput;

  this.$todoInput.addEventListener('keyup', (e) => {
    if (e.key === KEY.ENTER) {
      if (!this.$todoInput.value) {
        alert('할일을 입력하세요!');
        return;
      }

      addItem(this.$todoInput.value);
      this.$todoInput.value = '';
    }
  });
}
