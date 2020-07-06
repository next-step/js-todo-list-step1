import { KEYCODE_ENTER } from './constants.js';

function TodoInput(element, { addTodo }) {
  this.$input = element;
  this.addTodo = addTodo;

  this.$input.addEventListener('keypress',e => {
    const newValue = e.target.value;
    if (newValue === '') return;
    if (e.key === KEYCODE_ENTER) {
      this.addTodo(newValue);
      this.setText('');
    }
  });

  this.setText = text => {
    this.$input.value = text;
  }
}

export default TodoInput;
