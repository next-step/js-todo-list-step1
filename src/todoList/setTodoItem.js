const changCompletedTodoItem = (todoItem) => {
  if (todoItem.className === '') {
    return todoItem.setAttribute('class', 'completed');
  }
  todoItem.removeAttribute('class');
};

};

const triggerClickEvent = ({ target }) => {
  if (target.className === 'toggle') {
    changCompletedTodoItem(target.closest('li'));
  }
  }
};

export const setTodoItem = () => {
  const $todoList = document.querySelector('.todo-list');

  $todoList.addEventListener('click', triggerClickEvent);
};
