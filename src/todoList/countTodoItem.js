export const countTodoItem = () => {
  const $todoCount = document.querySelector('.todo-count > strong');
  const $todoList = document.querySelectorAll('.todo-list > li');
  const $todoListHidden = document.querySelectorAll(
    '.todo-list > li[class="hidden"]',
  );
  const $todoListCompletedHidden = document.querySelectorAll(
    '.todo-list > li[class="completed hidden"]',
  );

  $todoCount.innerHTML =
    $todoList.length - $todoListHidden.length - $todoListCompletedHidden.length;
};
