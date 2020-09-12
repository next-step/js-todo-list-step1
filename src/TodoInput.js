import {KEY} from './constants.js';

export default function TodoInput($todoInput, addItem) {
  if (!$todoInput) {
    throw new Error('ERROR: Invalid object');
  }

  this.$todoInput = $todoInput;

  this.$todoInput.addEventListener('keyup', ({key, target}) => {
    if (key === KEY.ENTER) {
      if (!target.value) {
        alert('할일을 입력하세요!');
        return;
      }

      addItem(target.value);
      target.value = '';
    }
  });
}
