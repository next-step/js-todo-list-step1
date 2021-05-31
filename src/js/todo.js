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
  };
  toDoItems.push(newToDoItem);
}

const toDoItemTemplate = (item) => {
  return (
    `
      <li id="${item.id}">
        <div class="view">
          <input class="toggle" type="checkbox"/>
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


