import { render } from './render.js';

export const toggleTodoItem = (todoItem) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const target = todoItem.dataset.id;

  if (todos[target].completed === false) {
    todos[target].completed = true;
  } else {
    todos[target].completed = false;
  }
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
};
