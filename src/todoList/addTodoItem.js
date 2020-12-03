import { countTodoItem } from './countTodoItem.js';

const newTodoTemplate = (text) => {
  return `<li>
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label class="label">${text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="새로운 타이틀" />
          </li>`;
};

const addNewTodoTemplate = (text) => {
  const $todoList = document.querySelector('.todo-list');

  $todoList.insertAdjacentHTML('beforeend', newTodoTemplate(text));
};

const addNewTodoItem = ({ key, target }) => {
  if (key === 'Enter' && target.value.length) {
    addNewTodoTemplate(target.value);
    target.value = '';
    countTodoItem();
  }
};

export const addTodoItem = () => {
  const $newTodo = document.querySelector('.new-todo');
  $newTodo.addEventListener('keyup', addNewTodoItem);
};
