import { countTodoItem } from '../todoList/countTodoItem.js';

const changCompletedTodoItem = (todoItem) => {
  if (todoItem.className === '') {
    return todoItem.setAttribute('class', 'completed');
  }
  todoItem.removeAttribute('class');
};

const removeTodoItem = (todoItem) => {
  return todoItem.remove();
};

export const triggerClickEvent = ({ target }) => {
  if (target.className === 'toggle') {
    changCompletedTodoItem(target.closest('li'));
  }
  if (target.className === 'destroy') {
    removeTodoItem(target.closest('li'));
  }
  countTodoItem();
};
