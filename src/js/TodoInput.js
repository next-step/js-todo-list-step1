function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector('#new-todo-title');

  $todoInput.addEventListener('keydown', (event) => this.addTodoItem(event));

  this.addTodoItem = (event) => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = '';
    }
  };

  this.isValid = (event, value) => {
    return !!(event.code === 'Enter' && value);

  };
}

export default TodoInput;
