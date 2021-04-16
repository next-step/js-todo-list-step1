function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector('#new-todo-title');

  $todoInput.addEventListener('keydown', (event) => this.addTodoItem(event));

  this.addTodoItem = (event) => {
    const $newTodoTarget = event.target;
    if (event.key === 'Enter') {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = '';
    }
  };
}

export default TodoInput;
