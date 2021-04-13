/* eslint-disable import/extensions */
import { count, filters, todoList, newTodoTitle } from './constant.js';

const App = {
  todos: [],

  makeListElement(todo) {
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
  },

  printTodo(todo) {
    let li;
    const selected = document.querySelector('.selected');

    if (
      selected.classList.contains('all') ||
      (selected.classList.contains('active') && todo.completed === false) ||
      (selected.classList.contains('completed') && todo.completed === true)
    ) {
      li = App.makeListElement(todo);
      todoList.insertAdjacentHTML('beforeend', li);
    }
  },

  eraseTodo() {
    const list = todoList.querySelectorAll('li');

    for (let i = 0; i < list.length; i++) {
      todoList.removeChild(list[i]);
    }
  },

  handleInputEditing(event) {
    if (event.keyCode !== 13 && event.keyCode !== 27) return;
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
          App.loadTodos();
          return;
        }
      }
    }
    if (event.keyCode === 27) {
      target.closest('li').classList.remove('editing');
    }
  },

  editTodos(event) {
    const { target } = event;
    const li = target.closest('li');
    li.classList.add('editing');
    const input = li.querySelector('.edit');
    input.addEventListener('keyup', App.handleInputEditing);
  },

  loadTodos() {
    const todosArray = JSON.parse(localStorage.getItem('todos'));

    App.eraseTodo();
    for (const todo in todosArray) {
      if (todosArray[todo]) {
        App.printTodo(todosArray[todo]);
      }
    }
    count.innerText = todoList.querySelectorAll('li').length;
    const listItems = todoList.querySelectorAll('li');
    for (const listItem of listItems) {
      listItem.addEventListener('dbclick', App.editTodos);
    }
  },

  saveTodo(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  },

  addTodo(event) {
    App.todos.push({
      value: event.target.value,
      completed: false,
      id: Date.now(),
      editing: ''
    });
    App.saveTodo(App.todos);
    App.loadTodos();
    event.target.value = '';
  },

  handleKeyup(event) {
    if (
      event.target.tagName !== 'INPUT' ||
      event.keyCode !== 13 ||
      event.target.value === ''
    )
      return;
    // TODO: refactor => 13 => enterkey
    App.addTodo(event);
  },

  handleToggleClick(target) {
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
      App.loadTodos();
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
      App.loadTodos();
    }
  },

  handleDestroyButtonClick(target) {
    const li = target.closest('li');
    const deleteResult = App.todos.filter(todo => {
      return todo.id !== parseInt(li.id, 10);
    });
    App.todos = deleteResult;
    localStorage.setItem('todos', JSON.stringify(App.todos));
    li.remove();
    App.loadTodos();
  },

  handleClickTodoList(event) {
    const { target } = event;

    if (target.className === 'toggle') {
      App.handleToggleClick(target);
    }
    if (target.className === 'destroy') {
      App.handleDestroyButtonClick(target);
    }
  },

  handleClickFilters(event) {
    const condition = filters.querySelector('.selected');

    if (condition) {
      condition.classList.remove('selected');
    }
    event.target.classList.add('selected');
    App.loadTodos();
  },

  init() {
    App.todos =
      localStorage.getItem('todos') === null
        ? []
        : JSON.parse(localStorage.getItem('todos'));
    App.loadTodos();

    newTodoTitle.addEventListener('keyup', App.handleKeyup);
    todoList.addEventListener('click', App.handleClickTodoList);
    filters.addEventListener('click', App.handleClickFilters);
    const listItems = todoList.querySelectorAll('li');
    for (const listItem of listItems) {
      listItem.addEventListener('dblclick', App.editTodos);
    }
  }
};

App.init();
