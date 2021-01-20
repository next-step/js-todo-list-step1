import $todoList from './todoList.js';

class NewTodoInput {
  constructor() {
    this.$newTodoInput = document.querySelector('#new-todo-title');
  }

  init() {
    this.addEventAddNewTodoOnEnter();
  }

  addEventAddNewTodoOnEnter() {
    this.$newTodoInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        $todoList.addNewTodoItem(e.target.value);
      }
    });
  }
}

const newTodoInput = new NewTodoInput();

export default newTodoInput;
