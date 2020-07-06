const STORAGE_KEY = 'js-todo-list';

const $TODO_INPUT = document.getElementById('new-todo-title');
const $TODO_LIST = document.getElementById('todo-list');
const $TODO_COUNT = document.getElementsByClassName('todo-count')[0];
const $TODO_FILTER = document.querySelector('ul.filters');

export { STORAGE_KEY, $TODO_INPUT, $TODO_LIST, $TODO_COUNT, $TODO_FILTER };
