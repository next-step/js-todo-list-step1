export const render = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const $todoList = document.querySelector('.todo-list');

  $todoList.innerHTML = todos;
};
