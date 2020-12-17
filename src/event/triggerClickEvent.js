import { removeTodoItem } from '../todoList/removeTodoItem.js';
import { setViewTodo } from '../todoList/setViewTodo.js';
import { toggleTodoItem } from '../todoList/toggleTodoItem.js';

export const triggerClickEvent = ({ target }) => {
  if (target.className === 'toggle') {
    toggleTodoItem(target.closest('li'));
  }
  if (target.className === 'destroy') {
    removeTodoItem(target.closest('li'));
  }
  if (target.tagName === 'A') {
    setViewTodo(target);
  }
};
