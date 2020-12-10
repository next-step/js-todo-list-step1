import { render } from '../todoList/render.js';
import { addTodoItem } from '../todoList/setState.js';

export const triggerKeyupEvent = ({ key, target }) => {
  if (key === 'Enter' && target.value.length) {
    addTodoItem(target.value);
    target.value = '';
    render();
  }
};
