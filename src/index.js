import { triggerClickEvent } from './event/triggerClickEvent.js';
import { triggerDoubleClickEvent } from './event/triggerDoubleClickEvent.js';
import { addTodoItem } from './todoList/addTodoItem.js';

const todoApp = () => {
  const $todoApp = document.querySelector('.todoapp');
  const $newTodo = document.querySelector('.new-todo');
  const $todoList = document.querySelector('.todo-list');

  $newTodo.addEventListener('keyup', addTodoItem);
  $todoApp.addEventListener('click', triggerClickEvent);
  $todoList.addEventListener('dblclick', triggerDoubleClickEvent);
};

todoApp();
