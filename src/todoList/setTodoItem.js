const exitEditTodoItem = ({ target, key }) => {
  const todoItem = target.closest('li');
  if (key === 'Escape') {
    todoItem.removeAttribute('class');
  }
  if (key === 'Enter') {
    todoItem.removeAttribute('class');
    todoItem.querySelector('label').innerHTML = target.value;
  }
};

export const editTodoItem = (todoItem) => {
  todoItem.setAttribute('class', 'editing');
  todoItem.addEventListener('keyup', exitEditTodoItem);
};
