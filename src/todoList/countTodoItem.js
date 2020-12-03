export const countTodoItem = () => {
  const $todoList = document.querySelector('.todo-list');
  const $countTodoItem = document.querySelector('strong');

  $countTodoItem.innerHTML = $todoList.childElementCount;
};
