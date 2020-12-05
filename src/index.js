import { triggerKeyupEvent } from './event/triggerKeyupEvent.js';
import { triggerClickEvent } from './event/triggerClickEvent.js';
import { triggerDoubleClickEvent } from './event/triggerDoubleClickEvent.js';

const todoApp = () => {
  const $todoApp = document.querySelector('.todoapp');
  const $newTodo = document.querySelector('.new-todo');
  const $todoList = document.querySelector('.todo-list');

  $newTodo.addEventListener('keyup', triggerKeyupEvent);
  $todoApp.addEventListener('click', triggerClickEvent);
  $todoList.addEventListener('dblclick', triggerDoubleClickEvent);
};

todoApp();
