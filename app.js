/* eslint-disable import/extensions */
import { count, filters, todoList, newTodoTitle } from './constant.js';

function App() {
  let todos;

  function saveTodo(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function makeListElement(todo) {
    const type = todo.completed === true ? `"checkbox" checked` : 'checkbox';
    const li = `<li class="${todo.completed === true ? 'completed' : 'false'}">
		<div class="view">
		<input class="toggle" type=${type} />
		<label class="label">${todo.value}</label>
		<button class="destroy"></button>
		</div>
		<input class="edit" value='${todo.value}' />
		</li>`;

    return li;
  }

  function printTodo(todo) {
    const li = makeListElement(todo);

    todoList.insertAdjacentHTML('beforeend', li);
  }

  function loadTodos() {
    // TODO: todos를 보여줘야 하는 옵션(filter)을 추가해주어야 함

    // eraseTodo();
    for (const todo of todos) {
      printTodo(todo);
    }
  }

  function addTodo(event) {
    todos.push({
      value: event.target.value,
      completed: false,
      key: Date.now()
    });
    saveTodo(todos);
    loadTodos();
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
