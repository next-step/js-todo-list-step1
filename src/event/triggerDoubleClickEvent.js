import { editTodoItem } from '../todoList/setTodoItem.js';

export const triggerDoubleClickEvent = ({ target }) => {
  if (target.className === 'label') {
    editTodoItem(target.closest('li'));
  }
};
