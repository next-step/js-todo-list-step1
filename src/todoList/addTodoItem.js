import { countTodoItem } from './countTodoItem.js';

const newTodoTemplate = (text) => {
  return `<li>
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label class="label">${text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${text}" />
          </li>`;
};

export const addTodoItem = (text) => {
  const $todoList = document.querySelector('.todo-list');

  $todoList.insertAdjacentHTML('beforeend', newTodoTemplate(text));
  countTodoItem();
};
