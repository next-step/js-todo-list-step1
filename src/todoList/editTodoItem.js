import { render } from './render.js';

const updateTodoItem = (text, id) => {
  const todos = JSON.parse(localStorage.getItem('todos'));

  todos.map((todo) => {
    if (todo.id === id) {
      todo.text = text;
    }
  });

  localStorage.setItem('todos', JSON.stringify(todos));
  render();
};

const exitEditTodoItem = ({ target, key }) => {
  const todoItem = target.closest('li');
  if (key === 'Escape') {
    todoItem.removeAttribute('class');
  }
  if (key === 'Enter') {
    todoItem.removeAttribute('class');
    updateTodoItem(target.value, todoItem.dataset.id);
  }
};

export const editTodoItem = (todoItem) => {
  todoItem.setAttribute('class', 'editing');
  todoItem.addEventListener('keyup', exitEditTodoItem);
};
