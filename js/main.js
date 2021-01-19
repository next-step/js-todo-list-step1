'use strict';

const $todoList = document.querySelector('#todo-list');
const $todoInput = document.querySelector('#new-todo-title');
const $todoFilters = document.querySelector('.filters');

let count = 0;

function makeItem(value) {
  const $li = document.createElement('li');
  const $viewDiv = document.createElement('div');
  const $checkboxInput = document.createElement('input');
  const $label = document.createElement('label');
  const $button = document.createElement('button');
  const $editInput = document.createElement('input');

  $viewDiv.setAttribute('class', 'view');
  $checkboxInput.setAttribute('type', 'checkbox');
  $checkboxInput.setAttribute('class', 'toggle');
  $label.setAttribute('class', 'label');
  $button.setAttribute('class', 'destroy');
  $editInput.setAttribute('class', 'edit');
  $editInput.setAttribute('value', value);

  $label.append(value);
  $viewDiv.append($checkboxInput);
  $viewDiv.append($label);
  $viewDiv.append($button);

  $li.append($viewDiv);
  $li.append($editInput);

  return $li;
}

function setCount(count) {
  const $todoCount = document.querySelector('.todo-count > strong');

  $todoCount.innerText = count;
}

$todoInput.addEventListener('keyup', (event) => {
  const value = event.target.value;

  if (value !== '' && event.key === 'Enter') {
    const item = makeItem(value);
    $todoList.append(item);
    setCount(++count);

    event.target.value = '';
  }
});

$todoList.addEventListener('click', (event) => {
  const target = event.target;

  if (target.nodeName === 'INPUT' && target.className !== 'edit') {
    target.closest("li").classList.toggle("completed");
  }

  if (target.nodeName === 'BUTTON') {
    target.closest("li").remove();
    setCount(--count);
  }
});

$todoList.addEventListener('dblclick', (event) => {
  const target = event.target;

  const $editInput = document.querySelector('.editing .edit');

  if ($editInput) {
    $editInput.focus();
    return;
  }

  if (target.nodeName === 'LABEL') {
    target.closest("li").className = 'editing';

    const $editInput = document.querySelector('.editing .edit');
    $editInput.focus();
    $editInput.setSelectionRange($editInput.value.length, $editInput.value.length + 1);
  }
});

$todoList.addEventListener('keyup', (event) => {
  const target = event.target;

  if (event.key === 'Enter' && target.nodeName === 'INPUT') {
    const $label = document.querySelector('.editing .view label');
    $label.innerText = event.target.value;

    target.closest("li").classList.remove('editing');
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'Escape') {
    const lis = document.querySelectorAll('li');

    lis.forEach((li) => {
      if (li.className === 'editing') {
        li.classList.remove('editing');
      }
    });
  }
});

function changeFilter(target) {
  const $filters = document.querySelectorAll('.filters li a');

  $filters.forEach((filter) => {
    filter.classList.remove('selected');
  });

  target.classList.add('selected');
}

$todoFilters.addEventListener('click', (event) => {
  const target = event.target;
  const className = target.className;

  if (className === 'all' || className === 'active' || className === 'completed') {
    changeFilter(target);
  }
});