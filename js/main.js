import App from './App.js';
import { exData, FILTERNAME } from './utils/constants.js';

const myStorageData = JSON.parse(localStorage.getItem('myTodo'));
const data = myStorageData || exData;
const countId = data[data.length -1 ].id + 1 || 1;
const filterType = FILTERNAME.ALL;

new App({
  data,
  countId,
  filterType,
  $targetTodoInput: document.querySelector('.new-todo'),
  $targetTodoList: document.querySelector('.todo-list'),
  $targetTodoCount: document.querySelector('.todo-count'),
  $targetTodoFilters: document.querySelector('.filters'),
  $targetTodoToggleAll: document.querySelector('.toggle-all-label'),
});
