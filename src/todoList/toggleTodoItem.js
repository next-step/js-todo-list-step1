import { render } from '../render/render.js';

const toggleCompleted = (todo) => {
  if (todo.completed === false) {
    return (todo.completed = true);
  }
  return (todo.completed = false);
};

export const toggleTodoItem = (todoItem) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const targetID = todoItem.dataset.id;

  todos.map((todo) => {
    if (todo.id === targetID) {
      return toggleCompleted(todo);
    }
    return todo;
  });

  localStorage.setItem('todos', JSON.stringify(todos));
  render();
};
