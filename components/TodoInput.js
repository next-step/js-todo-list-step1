class TodoInput {
  constructor(addTodoItems) {
    this.$todoInput = document.querySelector('.new-todo');
    this.$todoInput.addEventListener('keyup', (event) =>
      this.handleKeyup(event, addTodoItems)
    );
  }

  handleKeyup = (event, addTodoItems) => {
    if (event.key === 'Enter') {
      addTodoItems(event.target.value);
    }
  };
}

export default TodoInput;
