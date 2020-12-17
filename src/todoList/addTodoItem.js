import { render } from './render.js';

export const addTodoItem = (text) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const ID_NUMBER = localStorage.getItem('ID_NUMBER');
  const newTodos = [
    ...todos,
    {
      id: `${ID_NUMBER}`,
      text: `${text}`,
      completed: false,
    },
  ];

  localStorage.setItem('todos', JSON.stringify(newTodos));
  localStorage.setItem('ID_NUMBER', Number(ID_NUMBER) + 1);
  render();
};
