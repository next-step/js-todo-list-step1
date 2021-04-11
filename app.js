/* eslint-disable import/extensions */
import { count, filters, todoList, newTodoTitle } from './constant.js';

function App() {
  const todos = [];

  function addTodo(event) {
    todos.push({
      name: event.target.value,
      completed: false,
      key: Date.now()
    });

    // TODO: 아래는 render 영역으로 분리 필요
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

  function handleKeyup(event) {
    if (event.keyCode !== 13 || event.target.value === '') return;
    addTodo(event);
  }

  function init() {
    // loading

    // eventHandler
    newTodoTitle.addEventListener('keyup', handleKeyup);
  }
  init();
}

App();
