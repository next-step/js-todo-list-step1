import { render } from './render.js';

export const removeTodoItem = (todoItem) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const target = todoItem.dataset.id;

  localStorage.setItem(
    'todos',
    JSON.stringify(todos.filter((todo) => todo.id !== target)),
  );
  render();
};
