import { SELECTOR } from '../utils/constant.js';

/**
 *
 * @param {(value)=>void} onSubmit
 */

const TodoInput = (onSubmit) => {
  const container = document.getElementById(SELECTOR.TODO_INPUT);
  const form = document.getElementById(SELECTOR.TODO_FORM);

  render();

  function render() {
    container.addEventListener('input', onInput);
    form.addEventListener('submit', onSubmit);
  }

  function onInput(e) {
    const value = e.target.value;
    container.value = value;
  }
};

export default TodoInput;
