export const toggleCompletedTodoItem = (todoItem) => {
  const $checkbox = todoItem.querySelector('input');

  if (todoItem.className === '') {
    $checkbox.setAttribute('checked', true);
    return todoItem.setAttribute('class', 'completed');
  }
  $checkbox.removeAttribute('checked');
  return todoItem.removeAttribute('class');
};

export const removeTodoItem = (todoItem) => {
  return todoItem.remove();
};

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
