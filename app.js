/* eslint-disable import/extensions */
import { count, filters, todoList, newTodoTitle } from './constant.js';

function App() {
  let todos;

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
    let li;
    const selected = document.querySelector('.selected');

    if (selected.classList.contains('all') ||
    (selected.classList.contains('active') && todo.completed === false) || 
    (selected.classList.contains('completed') && todo.completed === true))
    {
      li = makeListElement(todo);
      todoList.insertAdjacentHTML('beforeend', li);
      return;
    }
  }

  function eraseTodo() {
    const list = todoList.querySelectorAll('li');

    for (let i = 0; i < list.length; i++) {
      todoList.removeChild(list[i]);
    }
  }

  function loadTodos() {
    const todosArray = JSON.parse(localStorage.getItem('todos'));
    
    eraseTodo();
    for (let todo in todosArray) {
      printTodo(todosArray[todo]);
    }
    count.innerText = todoList.querySelectorAll("li").length;
  }

  function saveTodo(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
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
    const todosArray = JSON.parse(localStorage.getItem('todos'));

    target.getAttribute('checked') === null
      ? target.setAttribute('checked', '')
      : target.removeAttribute('checked');
    if (li.className === 'false') {
      li.classList.add('completed');
      li.classList.remove('false');
      for (let i = 0; i < todosArray.length; i++) {
        if (todosArray[i].id === Number(li.id)) {
          todosArray[i].completed = true;
        }
      }
      localStorage.setItem('todos', JSON.stringify(todosArray));
      return;
    }
    if (li.className === 'completed') {
      li.classList.add('false');
      li.classList.remove('completed');
      for (let i = 0; i < todosArray.length; i++) {
        if (array[i].id === Number(li.id)) {
          array[i].completed = false;
        }
      }
      localStorage.setItem('todos', JSON.stringify(todosArray));
    }
  }

  function handleDeleteButtonClick(target) {
    const li = target.closest('li');
    const deleteResult = todos.filter(todo => {
      return todo.id !== parseInt(li.id, 10);
    });
    todos = deleteResult;
    localStorage.setItem('todos', JSON.stringify(todos));
    li.remove();
  }

  function handleClickTodoList(event) {
    const { target } = event;

    if (target.tagName === 'INPUT') {
      handleInputClick(target);
    }
    if (target.tagName === 'BUTTON') {
      handleDeleteButtonClick(target);
    }
    loadTodos();
    return;
  }

  function handleClickFilters(event) {
    const condition = filters.querySelector('.selected');

    if (condition) {
      condition.classList.remove('selected');
    }
    event.target.classList.add('selected');
    loadTodos();
  }

  function init() {
    todos =
      localStorage.getItem('todos') === null
        ? []
        : JSON.parse(localStorage.getItem('todos'));
    loadTodos();

    newTodoTitle.addEventListener('keyup', handleKeyup);
    todoList.addEventListener('click', handleClickTodoList);
    filters.addEventListener('click', handleClickFilters);
  }

  init();
}

const app = App;
app();