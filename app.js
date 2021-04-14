/* eslint-disable import/extensions */
import {
  count,
  filters,
  todoList,
  newTodoTitle,
  ENTER,
  ESC
} from './constant.js';

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

  renderByFilter(todo) {
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

    for (const listItem of list) {
      todoList.removeChild(listItem);
    }
  },

  reflectInputEditing(todosArrayElement, todosArray, li) {
    if (todosArrayElement.id !== Number(li.id)) return;
    todosArrayElement.value = li.querySelector('.edit').value;
    localStorage.setItem('todos', JSON.stringify(todosArray));
    App.todos = todosArray;
    li.classList.remove('editing');
    App.render();
  },

  handleInputEditing(event) {
    if (event.key !== ENTER && event.key !== ESC) return;
    const { target } = event;
    const li = target.closest('li');
    const todosArray = JSON.parse(localStorage.getItem('todos'));

    if (event.key === ESC) {
      li.classList.remove('editing');
      App.render();
      return;
    }
    if (event.key === ENTER) {
      for (const todosArrayElement of todosArray) {
        App.reflectInputEditing(todosArrayElement, todosArray, li);
      }
    }
  },

  editTodos(event) {
    const { target } = event;
    const li = target.closest('li');
    li.classList.add('editing');
    const input = li.querySelector('.edit');
    input.addEventListener('keyup', App.handleInputEditing);
  },

  render() {
    App.eraseTodo();

    const todosArray = JSON.parse(localStorage.getItem('todos'));
    todosArray.forEach(todoItem => todoItem && App.renderByFilter(todoItem));

    count.innerText = todoList.querySelectorAll('li').length;
    const listItems = todoList.querySelectorAll('li');
    for (const listItem of listItems) {
      listItem.addEventListener('dblclick', App.editTodos);
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
    App.render();
    event.target.value = '';
  },

  handleKeyup(event) {
    if (
      event.target.id !== 'new-todo-title' ||
      event.key !== ENTER ||
      event.target.value === ''
    )
      return;
    App.addTodo(event);
  },

  handleToggleClick(target) {
    const li = target.closest('li');
    const todosArray = JSON.parse(localStorage.getItem('todos'));

    target.getAttribute('checked') === null
      ? target.setAttribute('checked', '')
      : target.removeAttribute('checked');
    li.classList.toggle('completed');
    todosArray.forEach(todo => {
      if (todo.id === Number(li.id)) {
        todo.completed = !todo.completed;
      }
    });
    localStorage.setItem('todos', JSON.stringify(todosArray));
    App.todos = todosArray;
    App.render();
  },

  handleDestroyButtonClick(target) {
    const li = target.closest('li');
    const deleteResult = App.todos.filter(todo => {
      return todo.id !== parseInt(li.id, 10);
    });
    App.todos = deleteResult;
    localStorage.setItem('todos', JSON.stringify(App.todos));
    li.remove();
    App.render();
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
    App.render();
  },

  init() {
    App.todos =
      localStorage.getItem('todos') === null
        ? []
        : JSON.parse(localStorage.getItem('todos'));
    App.render();

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
