const editTodoItem = (todoItem) => {
  console.log(todoItem.closest('label'));
  todoItem.setAttribute('class', 'editing');
};

export const triggerDoubleClickEvent = ({ target }) => {
  if (target.className === 'label') {
    editTodoItem(target.closest('li'));
  }
};
