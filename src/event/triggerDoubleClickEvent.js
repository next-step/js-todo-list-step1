import { editTodoItem } from '../todoList/editTodoItem.js';

export const triggerDoubleClickEvent = ({ target }) => {
  if (target.className === 'label') {
    editTodoItem(target.closest('li'));
  }
};
