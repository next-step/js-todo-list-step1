import { handleCount } from './component/todoCount.js';
import { loadToDos, saveToDos } from './component/todoLocalStorage.js';
import { toDoApp } from './todoApp.js';
export let filterState = 'all';
export let toDos = [];

export const filterChange = (filter) => {
  filterState = filter;
};
export const filterToDos = (todos, testItemId) => {
  toDos = todos.filter((item) => `${item.id}` !== testItemId);
  saveToDos();
};

function init() {
  loadToDos();
  toDoApp();
  handleCount(toDos.length);
}

init();
