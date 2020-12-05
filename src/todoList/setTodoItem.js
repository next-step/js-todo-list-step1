export const changCompletedTodoItem = (todoItem) => {
  if (todoItem.className === '') {
    return todoItem.setAttribute('class', 'completed');
  }
  return todoItem.removeAttribute('class');
};

export const removeTodoItem = (todoItem) => {
  return todoItem.remove();
};
