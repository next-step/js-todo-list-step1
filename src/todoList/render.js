import { countTodoItem } from './countTodoItem.js';

const todoTemplate = (todo) => {
  return `<li class="${todo.checked ? 'completed' : ''}">
            <div class="view">
              <input class="toggle" type="checkbox" checkd=${todo.checked}/>
              <label class="label">${todo.text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.text}" />
           </li>`;
};

export const render = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const $todoList = document.querySelector('.todo-list');

  $todoList.innerHTML = '';
  todos.forEach((todo) => {
    $todoList.insertAdjacentHTML('beforeend', todoTemplate(todo));
  });
  countTodoItem();
};
