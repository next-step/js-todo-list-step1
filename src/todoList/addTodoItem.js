import { render } from './render.js';

export const addTodoItem = (text) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const newTodos = [
    ...todos,
    {
      text: `${text}`,
      completed: false,
    },
  ];

  localStorage.setItem('todos', JSON.stringify(newTodos));
  render();
};
