import { countTodoItem } from '../todoList/countTodoItem.js';

const todoTemplate = (todo) => {
  return `<li class="${todo.completed ? 'completed' : ''}" data-id=${todo.id}>
            <div class="view">
              <input class="toggle" type="checkbox" ${
                todo.completed ? 'checked' : ''
              }/>
              <label class="label">${todo.text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.text}" />
           </li>`;
};

const renderActive = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const $todoList = document.querySelector('.todo-list');

  $todoList.innerHTML = '';
  todos.forEach((todo) => {
    if (todo.completed === false)
      $todoList.insertAdjacentHTML('beforeend', todoTemplate(todo));
  });
  countTodoItem();
};

const renderCompleted = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const $todoList = document.querySelector('.todo-list');

  $todoList.innerHTML = '';
  todos.forEach((todo) => {
    if (todo.completed === true)
      $todoList.insertAdjacentHTML('beforeend', todoTemplate(todo));
  });
  countTodoItem();
};

const renderAll = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const $todoList = document.querySelector('.todo-list');

  $todoList.innerHTML = '';
  todos.forEach((todo) => {
    $todoList.insertAdjacentHTML('beforeend', todoTemplate(todo));
  });
};

const renderSelected = (target) => {
  if (target === 'all') {
    renderAll();
  }
  if (target === 'active') {
    renderActive();
  }
  if (target === 'completed') {
    renderCompleted();
  }
};

export const render = (target = '') => {
  if (target) {
    document
      .querySelectorAll('a')
      .forEach((a) => a.classList.remove('selected'));
    target.classList.add('selected');
    localStorage.setItem('selected', JSON.stringify(target.className));
  }

  const selected = JSON.parse(localStorage.getItem('selected')).split(' ')[0];

  renderSelected(selected);
  countTodoItem();
};
