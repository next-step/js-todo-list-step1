import { countTodoItem } from '../todoList/countTodoItem.js';
import {
  changCompletedTodoItem,
  removeTodoItem,
} from '../todoList/setTodoItem.js';
import { hashChangeEvent } from './hashChangeEvent.js';

export const triggerClickEvent = ({ target }) => {
  if (target.className === 'toggle') {
    changCompletedTodoItem(target.closest('li'));
  }
  if (target.className === 'destroy') {
    removeTodoItem(target.closest('li'));
  }
  if (target.tagName === 'A') {
    hashChangeEvent(target);
  }
  countTodoItem();
};
