import { addTodoItem } from '../todoList/addTodoItem.js';
export const triggerKeyupEvent = ({ key, target }) => {
  if (key === 'Enter' && target.value.length) {
    addTodoItem(target.value);
    target.value = '';
  }
};
