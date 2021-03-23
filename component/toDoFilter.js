import { toDos } from '../src/app.js';
import { renderToDos, toDoRenderClear } from './toDoList.js';

const $toDoCount = document.querySelector('.todo-count strong');
export const $toDofilters = document.querySelector('.filters');

export const handleFilterClick = (e) => {
  e.preventDefault();

  const filterState = e.target.className;
  const $filterAtag = $toDofilters.querySelectorAll('a');
  const filters = filterClear($filterAtag);

  filters.forEach((item) => {
    if (item.className === filterState) {
      item.classList.toggle('selected');
      filtering(filterState);
    }
  });
};
export const handleCount = (toDo) => {
  $toDoCount.innerText = toDo.length;
};

const FilterStateAll = () => {
  toDoRenderClear();
  toDos.forEach((toDo) => renderToDos(toDo));
};

const FilterStateActive = () => {
  toDoRenderClear();
  const newToDos = toDos.filter((item) => {
    return item.completed === false;
  });
  newToDos.forEach((toDo) => renderToDos(toDo));
};

const FilterStateCompleted = () => {
  toDoRenderClear();
  const newToDos = toDos.filter((item) => {
    return item.completed === true;
  });
  newToDos.forEach((toDo) => renderToDos(toDo));
};

const findFilter = (e) => {
  const $todoApp = e.closest('.todoapp');
  const filterAtags = $todoApp.querySelectorAll('.filters a');

  for (const item of filterAtags) {
    if (item.className.includes('selected')) {
      return item.className.split(' ')[0];
    }
  }
};

export const filtering = (filterState) => {
  filterState = typeof filterState === 'string' ? filterState : findFilter(filterState);

  if (filterState === 'all') {
    FilterStateAll();
  } else if (filterState === 'active') {
    FilterStateActive();
  } else if (filterState === 'completed') {
    FilterStateCompleted();
  }
};

const filterClear = (filterAtag) => {
  filterAtag.forEach((item) => {
    item.classList.remove('selected');
  });
  return filterAtag;
};
