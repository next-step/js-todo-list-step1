import { countTodoItem } from '../todoList/countTodoItem.js';
import {
  removeTodoItem,
  toggleCompletedTodoItem,
} from '../todoList/setTodoItem.js';
import { setViewTodo } from '../todoList/setViewTodo.js';

export const triggerClickEvent = ({ target }) => {
  if (target.className === 'toggle') {
    toggleCompletedTodoItem(target.closest('li'));
  }
  if (target.className === 'destroy') {
    removeTodoItem(target.closest('li'));
  }
  if (target.tagName === 'A') {
    setViewTodo(target);
  }
  countTodoItem();
};
