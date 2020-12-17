import { render, renderCompleted, renderIncompleted } from './render.js';

export const setViewTodo = (target) => {
  if (target.className === 'all') {
    render();
  }
  if (target.className === 'active') {
    renderIncompleted();
  }
  if (target.className === 'completed') {
    renderCompleted();
  }
  document.querySelectorAll('a').forEach((a) => a.classList.remove('selected'));
  target.classList.add('selected');
};
