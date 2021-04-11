/* eslint-disable import/extensions */
import { count, filters, todoList, newTodoTitle } from './constant.js';

function App() {
  const todos = [];

  function handleKeyup(event) {
    if (event.keyCode === 13 && event.target.value !== '') {
      todos.push({
        name: event.target.value,
        completed: false,
        key: Date.now()
      });
      const todo = `<li>
			<div class="view">
			<input class="toggle" type="checkbox"/>
			<label class="label">${event.target.value}</label>
			<button class="destroy"></button>
			</div>
			<input class="edit" value='${event.target.value}' />
			</li>`;
      todoList.insertAdjacentHTML('beforeend', todo);
      event.target.value = '';
    }
  }

  function init() {
    // loading

    // eventHandler
    newTodoTitle.addEventListener('keyup', handleKeyup);
  }
  init();
}

App();
