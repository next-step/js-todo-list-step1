import { triggerClickEvent } from '../event/triggerClickEvent.js';
import { triggerDoubleClickEvent } from '../event/triggerDoubleClickEvent.js';
import { addTodoItem } from './addTodoItem.js';

export const setTodoList = () => {
  const $todoList = document.querySelector('.todo-list');

  addTodoItem();
  $todoList.addEventListener('click', triggerClickEvent);
  $todoList.addEventListener('dblclick', triggerDoubleClickEvent);
};
