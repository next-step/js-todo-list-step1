`use strict`;

class TodoInput {
  constructor(todoInputKeyUp) {
    const $todoInput = document.querySelector('#new-todo-title');

    this.$todoInput = $todoInput;
    this.todoInputKeyUp = todoInputKeyUp;

    $todoInput.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  onKeyUp(event) {
    if (event.code === 'Enter') {
      const value = event.target.value;

      this.$todoInput.value = '';

      this.todoInputKeyUp(value);
    }
  }
}

export default TodoInput;
