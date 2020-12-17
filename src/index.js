import { triggerKeyupEvent } from './event/triggerKeyupEvent.js';
import { triggerClickEvent } from './event/triggerClickEvent.js';
import { triggerDoubleClickEvent } from './event/triggerDoubleClickEvent.js';
import { render } from './todoList/render.js';

const initLocalStorage = () => {
  if (localStorage.getItem('todos') === null) {
    localStorage.setItem('todos', '[]');
  }
  if (localStorage.getItem('ID_NUMBER') === null) {
    localStorage.setItem('ID_NUMBER', 0);
  }
};

export const todoApp = () => {
  const $todoApp = document.querySelector('.todoapp');
  const $newTodo = document.querySelector('.new-todo');
  const $todoList = document.querySelector('.todo-list');

  $newTodo.addEventListener('keyup', triggerKeyupEvent);
  $todoApp.addEventListener('click', triggerClickEvent);
  $todoList.addEventListener('dblclick', triggerDoubleClickEvent);

  initLocalStorage();
  render();
};

todoApp();
