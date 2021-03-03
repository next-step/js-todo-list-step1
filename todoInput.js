const eventHandler = (addItem) => {
  const _createTodoItem = ({ target, key }) => {
    if (!target.classList.contains('new-todo')) {
      return;
    }
    if (key !== 'Enter') {
      return;
    }

    addItem(target.value);
    target.value = '';
  };

  const addEventListener = (input) => {
    input.addEventListener('keyup', _createTodoItem);

    return input;
  };

  return {
    addEventListener,
  };
};

const todoInput = (addItem) => {
  const _addEventListener = eventHandler(addItem);
  _addEventListener.addEventListener(document.getElementById('new-todo-title')); //TODO
};

export { todoInput };
