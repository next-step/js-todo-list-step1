import { KEYCODE_ENTER } from '../enum.js';

const TodoInput = ({ onAdd }) => {
  const inputElement = document.querySelector('#new-todo-title');

  const addTodoItem = (e) => {
    if (e.keyCode === KEYCODE_ENTER) {
      const todoTarget = e.target;
      onAdd(todoTarget.value);
      todoTarget.value = '';
    }
  };

  inputElement.addEventListener('keydown', addTodoItem);
};

export default TodoInput;
