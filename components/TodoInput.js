class TodoInput {
  constructor($target, { addTodos }) {
    this.$todoInput = $target;

    $target.addEventListener('keyup', (e) => this.onSubmit(e, addTodos));
  }

  onSubmit = (e, addTodos) => {
    if (e.key === 'Enter') {
      addTodos(e.target.value);
      this.$todoInput.value = '';
    }
  };
}

export default TodoInput;
