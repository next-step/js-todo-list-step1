const eventHandler = (addItem) => {
  const _createTodoItem = ({ target, key }) => {
    if (!target.classList.contains('new-todo')) {
      return;
    }
    if (key !== 'Enter') {
      return;
    }

    addItem(target.value.trim());
    target.value = '';
  };

  const addEventListener = ($input) => {
    $input.addEventListener('keyup', _createTodoItem);
  };

  return {
    addEventListener,
  };
};

const todoInput = (addItem) => {
  const $input = document.getElementById('new-todo-title');

  const _eventHandler = eventHandler(addItem);
  _eventHandler.addEventListener($input);

  return {
    focus() {
      $input.focus();
    },
  };
};

export { todoInput };
