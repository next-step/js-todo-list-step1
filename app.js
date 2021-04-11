/* eslint-disable import/extensions */
import { count, filters, todoList, newTodoTitle } from './constant.js';

function App() {
  let todos;

  function saveTodo(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function loadTodos() {
    for (const todo of todos) {
      // printTodo(todo);
    }
  }

  function addTodo(event) {
    todos.push({
      value: event.target.value,
      completed: false,
      key: Date.now()
    });
    saveTodo(todos);

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
    todos =
      localStorage.getItem('todos') === null
        ? []
        : JSON.parse(localStorage.getItem('todos'));
    loadTodos();
    // loading

    // eventHandler
    newTodoTitle.addEventListener('keyup', handleKeyup);
  }
  init();
}

App();
