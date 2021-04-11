/* eslint-disable import/extensions */
import { count, filters, todoList, newTodoTitle } from './constant.js';

function App() {
  let todos;

  function saveTodo(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function makeListElement(todo) {
    const type = todo.completed === true ? `"checkbox" checked` : 'checkbox';
    const li = `<li class="${
      todo.completed === true ? 'completed' : 'false'
    }" id=${todo.id}>
		<div class="view">
		<input class="toggle" type=${type} id=${todo.id} />
		<label class="label">${todo.value}</label>
		<button class="destroy" id=${todo.id}></button>
		</div>
		<input class="edit" value='${todo.value}' />
		</li>`;

    return li;
  }

  function printTodo(todo) {
    const li = makeListElement(todo);

    todoList.insertAdjacentHTML('beforeend', li);
  }

  function eraseTodo() {
    const list = todoList.querySelectorAll('li');

    for (let i = 0; i < list.length; i++) {
      todoList.removeChild(list[i]);
    }
  }

  function loadTodos() {
    // TODO: todos를 보여줘야 하는 옵션(filter)을 추가해주어야 함

    eraseTodo();
    for (const todo of todos) {
      printTodo(todo);
    }
    count.innerText = todos.length;
  }

  function addTodo(event) {
    todos.push({
      value: event.target.value,
      completed: false,
      id: Date.now()
    });
    saveTodo(todos);
    loadTodos();
    event.target.value = '';
  }

  function handleKeyup(event) {
    if (event.keyCode !== 13 || event.target.value === '') return;
    addTodo(event);
  }

  function handleInputClick(target) {
    const li = target.closest('li');
    const array = JSON.parse(localStorage.getItem('todos'));

    target.getAttribute('checked') === null
      ? target.setAttribute('checked', '')
      : target.removeAttribute('checked');
    if (li.className === 'false') {
      li.classList.add('completed');
      li.classList.remove('false');
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === Number(li.id)) {
          array[i].completed = true;
        }
      }
      localStorage.setItem('todos', JSON.stringify(array));
      return;
    }
    if (li.className === 'completed') {
      li.classList.add('false');
      li.classList.remove('completed');
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === Number(li.id)) {
          array[i].completed = false;
        }
      }
      localStorage.setItem('todos', JSON.stringify(array));
    }
  }

  function handleDeleteButtonClick(target) {
    const li = target.closest('li');
    const test = todos.filter(todo => {
      return todo.id !== parseInt(li.id, 10);
    });
    todos = test;
    localStorage.setItem('todos', JSON.stringify(todos));
    li.remove();
  }

  function handleClickTodoList(event) {
    const { target } = event;

    if (target.tagName === 'INPUT') {
      handleInputClick(target);
      return;
    }
    if (target.tagName === 'BUTTON') {
      handleDeleteButtonClick(target);
      return;
    }
    loadTodos();
  }
  function handleClickFilters(event) {
    filters.querySelector('.selected').classList.remove('selected');
    event.target.classList.add('selected');
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
    todoList.addEventListener('click', handleClickTodoList);
    filters.addEventListener('click', handleClickFilters);
  }
  init();
}

App();
