import { countTodoItem } from '../todoList/countTodoItem.js';
import {
  removeTodoItem,
  toggleCompletedTodoItem,
} from '../todoList/setTodoItem.js';
import { hashChangeEvent } from './hashChangeEvent.js';

export const triggerClickEvent = ({ target }) => {
  if (target.className === 'toggle') {
    toggleCompletedTodoItem(target.closest('li'));
  }
  if (target.className === 'destroy') {
    removeTodoItem(target.closest('li'));
  }
  if (target.tagName === 'A') {
    hashChangeEvent(target);
  }
  countTodoItem();
};
