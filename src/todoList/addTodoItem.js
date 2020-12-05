// eslint-disable-next-line import/no-unresolved
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

const addNewTodoTemplate = (text) => {
  const $todoList = document.querySelector('.todo-list');

  $todoList.insertAdjacentHTML('beforeend', newTodoTemplate(text));
};

export const addTodoItem = ({ key, target }) => {
  if (key === 'Enter' && target.value.length) {
    addNewTodoTemplate(target.value);
    target.value = '';
    countTodoItem();
  }
};
