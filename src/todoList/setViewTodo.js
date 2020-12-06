import { countTodoItem } from './countTodoItem.js';

const viewAll = () => {
  document
    .querySelectorAll('.todo-list > li')
    .forEach((li) => li.classList.remove('hidden'));
};

const viewActive = () => {
  document.querySelectorAll('.todo-list > li').forEach((li) => {
    if (li.className === 'hidden') {
      li.classList.remove('hidden');
    }
  });
};

const viewCompleted = () => {
  document.querySelectorAll('.todo-list > li').forEach((li) => {
    if (li.className === 'completed hidden') {
      li.classList.remove('hidden');
    }
  });
};

const resetScreen = () => {
  document.querySelectorAll('a').forEach((a) => a.classList.remove('selected'));
  document
    .querySelectorAll('.todo-list > li')
    .forEach((li) => li.classList.add('hidden'));
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
  target.classList.add('selected');
};
