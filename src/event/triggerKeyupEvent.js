import { addTodoItem } from '../todoList/addTodoItem.js';
import { countTodoItem } from '../todoList/countTodoItem.js';

export const triggerKeyupEvent = ({ key, target }) => {
  if (key === 'Enter' && target.value.length) {
    addTodoItem(target.value);
    target.value = '';
    countTodoItem();
  }
};
