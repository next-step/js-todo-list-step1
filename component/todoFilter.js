import { filterChange, filterState, toDos } from '../init.js';
import { activeEl, completedEl, filterEls, todoListEl, allEl } from './constant.js';
import { handleCount } from './todoCount.js';
import { addToDos } from './todoList.js';

export const viewAllClick = (event) => {
  event.preventDefault();
  filterChange('all');
  filterEls.forEach((el) => {
    el.classList.remove('selected');
  });
  allEl.classList.add('selected');

  todoListEl.innerHTML = '';

  toDos.map((item) => addToDos(item));
  handleCount(toDos.length);
};

export const viewActiveClick = (event) => {
  event.preventDefault();

  filterChange('active');

  filterEls.forEach((el) => {
    el.classList.remove('selected');
  });
  activeEl.classList.add('selected');

  renderActiveItems();
};

export const viewCompletedClick = (event) => {
  event.preventDefault();
  filterChange('completed');
  filterEls.forEach((el) => {
    el.classList.remove('selected');
  });
  completedEl.classList.add('selected');

  renderCompleteItems();
};

export const renderFromFilter = () => {
  if (filterState === 'completed') renderCompleteItems();
  else if (filterState === 'active') renderActiveItems();
};

const renderActiveItems = () => {
  todoListEl.innerHTML = '';
  const activeItems = toDos.filter((item) => item.completed === false);
  activeItems.map((item) => {
    addToDos(item);
  });
  handleCount(activeItems.length);
};

const renderCompleteItems = () => {
  todoListEl.innerHTML = '';
  const completedItems = toDos.filter((item) => item.completed === true);
  completedItems.map((item) => {
    addToDos(item);
  });
  handleCount(completedItems.length);
};
