import { countTodoItem } from './countTodoItem.js';

const viewAll = () => {
  document
    .querySelectorAll('.todo-list > li')
    .forEach((li) => (li.style.display = 'inline'));
};

const viewActive = () => {
  document.querySelectorAll('.todo-list > li').forEach((li) => {
    if (li.className === '') {
      li.style.display = 'inline';
    }
  });
};

const viewCompleted = () => {
  document.querySelectorAll('.todo-list > li').forEach((li) => {
    if (li.className === 'completed') {
      li.style.display = 'inline';
    }
  });
};

const resetScreen = () => {
  document.querySelectorAll('a').forEach((a) => a.classList.remove('selected'));
  document
    .querySelectorAll('.todo-list > li')
    .forEach((li) => (li.style.display = 'none'));
};

export const setViewTodo = (target) => {
  resetScreen();
  if (target.className === 'all') {
    viewAll();
  }
  if (target.className === 'active') {
    viewActive();
  }
  if (target.className === 'completed') {
    viewCompleted();
  }
  countTodoItem();
  target.classList.add('selected');
};
