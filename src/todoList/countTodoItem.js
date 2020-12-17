export const countTodoItem = () => {
  const $todoCount = document.querySelector('.todo-count > strong');
  const $todoList = document.querySelectorAll('#todo-list > li');

  $todoCount.innerHTML = $todoList.length;
};
