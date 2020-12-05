import { triggerClickEvent } from './event/triggerClickEvent.js';
import { triggerDoubleClickEvent } from './event/triggerDoubleClickEvent.js';
import { addTodoItem } from './todoList/addTodoItem.js';

const todoApp = () => {
  const $todoList = document.querySelector('.todo-list');
  const $filters = document.querySelector('.filters');

  addTodoItem();
  $filters.addEventListener('click', triggerClickEvent);
  $todoList.addEventListener('click', triggerClickEvent);
  $todoList.addEventListener('dblclick', triggerDoubleClickEvent);
};

todoApp();
