import { removeTodoItem } from '../todoList/removeTodoItem.js';
import { toggleTodoItem } from '../todoList/toggleTodoItem.js';
import { render } from '../render/render.js';

export const triggerClickEvent = ({ target }) => {
  if (target.className === 'toggle') {
    toggleTodoItem(target.closest('li'));
  }
  if (target.className === 'destroy') {
    removeTodoItem(target.closest('li'));
  }
  if (target.tagName === 'A') {
    render(target);
  }
};
