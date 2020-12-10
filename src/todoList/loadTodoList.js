export const loadTodoList = () => {
  const $todoList = document.querySelector('.todo-list');
  const todoItem = localStorage.getItem('todoItem');

  $todoList.insertAdjacentHTML('beforeend', JSON.parse(todoItem));
};

// localStorage.setItem(‘todoItem’, JSON.stirngify(todoItems))
// Const todoItem = localStorage.getItem(‘’todoItem”)
// JSON.parse(todoItem)
