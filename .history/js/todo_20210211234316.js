'use strict';

const $todoInput = document.querySelector('.new-todo');
const $todoList = document.querySelector('.todo-list');
const $todoCount = document.querySelector('.todo-count');
const $todoFilter = document.querySelector('.filters');

const filterOption = Object.freeze({
  all: 'all',
  active: 'active',
  completed: 'completed',
});

let TODO_ITEMS = [];
let FILTER_OPTION = filterOption.all;

class TodoItem {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }
  completed = false;
}

$todoInput.addEventListener('keyup', onKeyUpTodoInput);
$todoList.addEventListener('click', onClickTodoList);
$todoList.addEventListener('dblclick', onDoubleClickTodoList);
$todoList.addEventListener('keyup', onKeyUpTodoList);
$todoFilter.addEventListener('click', onClickTodoFilter);

function onKeyUpTodoInput(event) {
  if (event.key !== 'Enter' || $todoInput.value.trim() === '') return;
  addTodoItem();
  countTodoItem();
}

function onClickTodoList(event) {
  if (event.target.className === 'destroy') deleteTodoItem(event.target);
  if (event.target.className === 'toggle') toggleTodoItem(event.target);
  countTodoItem();
  saveTodoItems();
}

function onDoubleClickTodoList(event) {
  changeToEditMode(event.target);
}

function onKeyUpTodoList(event) {
  if (event.key === 'Enter') editTodoItem(event.target);
}

function onClickTodoFilter(event) {
  if (
    event.target.tagName !== 'A' ||
    event.target.classList.contains('selected')
  )
    return;
  changeFilterOption(event.target);
  renderTodoList();
  countTodoItem();
}

// add todoItem
function addTodoItem() {
  const text = $todoInput.value;
  const id = TODO_ITEMS.length;
  pushTodoItems(text, id);
  renderTodoList();
  clearTodoInput();
  saveTodoItems();
}

function pushTodoItems(text, id) {
  const todoItem = new TodoItem(text, id);
  TODO_ITEMS.push(todoItem);
}

function renderTodoItem(text, id, completed = false) {
  const $todoItem = createTodoItem(text, id, completed);
  $todoList.append($todoItem);
}

function createTodoItem(text, id, completed = false) {
  const $li = document.createElement('li');
  $li.setAttribute('data-id', id);
  $li.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="label">${text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${text}" />
  `;
  if (completed) {
    $li.classList.add('completed');
    $li.querySelector('.toggle').checked = true;
  }
  return $li;
}

function deleteTodoItem(eventTarget) {
  const $targetItem = eventTarget.closest('li');
  const targetID = parseInt($targetItem.dataset.id);
  TODO_ITEMS.forEach((item, index) => {
    if (item.id === targetID) TODO_ITEMS.splice(index, 1);
  });
  $targetItem.remove();
}

function toggleTodoItem(eventTarget) {
  const $targetItem = eventTarget.closest('li');
  const targetID = parseInt($targetItem.dataset.id);
  if ($targetItem.className === '') {
    $targetItem.classList.add('completed');
    TODO_ITEMS.forEach(item => {
      if (item.id === targetID) item.completed = true;
    });
  } else {
    $targetItem.classList.remove('completed');
    TODO_ITEMS.forEach(item => {
      if (item.id === targetID) item.completed = false;
    });
  }
}

function changeToEditMode(eventTarget) {
  const $targetItem = eventTarget.closest('li');
  $targetItem.classList.add('editing');
}

function editTodoItem(eventTarget) {
  const $targetItem = eventTarget.closest('li');
  const targetID = parseInt($targetItem.dataset.id);
  const $label = $targetItem.querySelector('.label');
  const text = $targetItem.querySelector('.edit').value;
  $label.innerText = text;
  TODO_ITEMS.forEach(item => {
    if (item.id === targetID) item.text = text;
  });
  $targetItem.classList.remove('editing');
}

function changeFilterOption(targetBtn) {
  const $selectedBtn = $todoFilter.querySelector('.selected');
  $selectedBtn.classList.remove('selected');
  targetBtn.classList.add('selected');
  FILTER_OPTION = targetBtn.classList[0];
}

function renderTodoList() {
  clearTodoList();
  switch (FILTER_OPTION) {
    case filterOption.all:
      TODO_ITEMS.forEach(item => {
        renderTodoItem(item.text, item.id, item.completed);
      });
      break;
    case filterOption.active:
      TODO_ITEMS.forEach(item => {
        if (item.completed === false)
          renderTodoItem(item.text, item.id, item.completed);
      });
      break;
    case filterOption.completed:
      TODO_ITEMS.forEach(item => {
        if (item.completed === true)
          renderTodoItem(item.text, item.id, item.completed);
      });
      break;
  }
}

function clearTodoList() {
  $todoList.innerHTML = '';
}

function clearTodoInput() {
  $todoInput.value = '';
}

function countTodoItem() {
  const todoItems = $todoList.querySelectorAll('li');
  const count = todoItems.length;
  $todoCount.innerHTML = `총 <strong>${count}</strong> 개</span>`;
}

function saveTodoItems() {
  localStorage.setItem('todoItems', JSON.stringify(TODO_ITEMS));
}

function loadTodoItems() {
  const loadedTodoItems = localStorage.getItem('todoItems');
  const parsedTodoItems = JSON.parse(loadedTodoItems);
  if (parsedTodoItems === null) return;
  TODO_ITEMS = parsedTodoItems;
  renderTodoList();
  countTodoItem();
}

loadTodoItems();
