import { triggerClickEvent } from '../event/triggerClickEvent.js';
import { triggerDoubleClickEvent } from '../event/triggerDoubleClickEvent.js';

export const setTodoItem = () => {
  const $todoList = document.querySelector('.todo-list');

  $todoList.addEventListener('click', triggerClickEvent);
  $todoList.addEventListener('dblclick', triggerDoubleClickEvent);
};
