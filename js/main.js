import App from './App.js';
import {
  exData,
  FILTER_NAME,
  METHOD_NAME,
  STORAGE_NAME,
} from './utils/constants.js';
import * as functions from './utils/functions.js';

const myStorageData = functions.controlLocalStorage(
  STORAGE_NAME,
  METHOD_NAME.GET,
);
const data = myStorageData || exData;
const countId = data.length > 0 && data[data.length - 1].id + 1 || 1;
const filterType = FILTER_NAME.ALL;

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
