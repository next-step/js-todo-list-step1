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

    if (
      selected.classList.contains('all') ||
      (selected.classList.contains('active') && todo.completed === false) ||
      (selected.classList.contains('completed') && todo.completed === true)
    ) {
      li = makeListElement(todo);
      todoList.insertAdjacentHTML('beforeend', li);
    }
  }

  function eraseTodo() {
    const list = todoList.querySelectorAll('li');

    for (let i = 0; i < list.length; i++) {
      todoList.removeChild(list[i]);
    }
  }

  function handleInputEditing(event) {
    const { target } = event;
    const li = target.closest('li');
    const todosArray = JSON.parse(localStorage.getItem('todos'));
    // TODO: keycode const

    if (event.keyCode === 13) {
      for (let i = 0; i < todosArray.length; i++) {
        if (todosArray[i].id === Number(li.id)) {
          todosArray[i].value = document.querySelector('.edit').value;
          localStorage.setItem('todos', JSON.stringify(todosArray));
          target.closest('li').classList.remove('editing');
        }
      }
      // this.loadTodos(); // ERROR
      return;
    }
    if (event.keyCode === 27) {
      target.closest('li').classList.remove('editing');
    }
  }

  function editTodos(event) {
    const { target } = event;
    const li = target.closest('li');
    li.classList.add('editing');
    const input = li.querySelector('.edit');
    input.addEventListener('keyup', handleInputEditing);
  }

  function loadTodos() {
    const todosArray = JSON.parse(localStorage.getItem('todos'));

    eraseTodo();
    for (const todo in todosArray) {
      if (todosArray[todo]) {
        printTodo(todosArray[todo]);
      }
    }
    count.innerText = todoList.querySelectorAll('li').length;
    const listItems = todoList.querySelectorAll('li');
    for (const listItem of listItems) {
      listItem.addEventListener('dbclick', editTodos);
    }
  }

  function saveTodo(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function addTodo(event) {
    todos.push({
      value: event.target.value,
      completed: false,
      id: Date.now(),
      editing: ''
    });
    saveTodo(todos);
    loadTodos();
    event.target.value = '';
  }

  function handleKeyup(event) {
    if (event.keyCode !== 13 || event.target.value === '') return;
    // TODO: refactor => 13 => enterkey
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
      loadTodos();
      return;
    }
    if (li.className === 'completed') {
      li.classList.add('false');
      li.classList.remove('completed');
      for (let i = 0; i < todosArray.length; i++) {
        if (todosArray[i].id === Number(li.id)) {
          todosArray[i].completed = false;
        }
      }
      localStorage.setItem('todos', JSON.stringify(todosArray));
      loadTodos();
    }
  }

  function handleDestroyButtonClick(target) {
    const li = target.closest('li');
    const deleteResult = todos.filter(todo => {
      return todo.id !== parseInt(li.id, 10);
    });
    todos = deleteResult;
    localStorage.setItem('todos', JSON.stringify(todos));
    li.remove();
    loadTodos();
  }

  function handleClickTodoList(event) {
    const { target } = event;

    if (target.className === 'toggle') {
      handleInputClick(target);
    }
    if (target.className === 'destroy') {
      handleDestroyButtonClick(target);
    }
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
    const listItems = todoList.querySelectorAll('li');
    for (const listItem of listItems) {
      listItem.addEventListener('dblclick', editTodos);
    }
  }

  init();
}

const app = App;
app();
