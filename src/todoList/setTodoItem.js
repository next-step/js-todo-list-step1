export const changCompletedTodoItem = (todoItem) => {
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

//, input 태그에 checked 속성 추가
