'use strict';
const $ = (selector) => document.querySelector(selector);
const $todoInput = $('.new-todo');
const $todoList = $('.todo-list');
let toDoItems = [];
let id = 1;

const AddToDo = (contents) => {
  const newToDoItem = {
    id: id++,
    data: contents,
    completed: false
  };
  toDoItems.push(newToDoItem);
}

const toDoItemTemplate = (item) => {
  return (
    `
      <li id="${item.id}" class="${item.completed ? 'completed' : ''}">
        <div class="view">
          <input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}/>
          <label class="label">${item.data}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.data}" />
      </li>
      `
  );
}

const render = items => {
  const template = items.map(item => toDoItemTemplate(item));
  $todoList.innerHTML = template.join("");
}

const ToggleItem = e => {
  const $li = e.target.closest('li');
  if ($li.classList.contains('completed')) {
    $li.classList.remove('completed');
    e.target.removeAttribute('checked');
  } else {
    $li.classList.add('completed');
    e.target.setAttribute('checked', '');
  }
  toDoItems.forEach(item => {
    if (item.id === parseInt($li.id)) {
      item.completed = !item.completed;
    }
  })
}

const RemoveItem = e => {
  const $li = e.target.closest('li');
  $todoList.removeChild($li);
  const rmToDoItem = toDoItems.filter(item => item.id !== parseInt($li.id));
  toDoItems = rmToDoItem;
}

$todoList.addEventListener('click', e => {
  if (e.target.classList.contains('toggle')) {
    ToggleItem(e);
  } else if (e.target.classList.contains('destroy')) {
    RemoveItem(e);
  }
});

$todoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.value !== '') {
    AddToDo(e.target.value);
    e.target.value = "";
  }
  render(toDoItems);
});

function init() {
  render(toDoItems);
}


