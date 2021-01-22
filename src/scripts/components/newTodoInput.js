import $todoList from './TodoList.js';

class NewTodoInput {
  constructor() {
    this.$newTodoInput = document.querySelector('#new-todo-title');
  }

  init() {
    this.addEventAddNewTodoOnEnter();
  }

  addEventAddNewTodoOnEnter() {
    this.$newTodoInput.addEventListener('keyup', (e) => {
      const todoTitle = e.target.value;
      if (e.key === 'Enter' && todoTitle.trim() !== '') {
        $todoList.addNewTodoItem(e.target.value);
        e.target.value = '';
      }
    });
  }
}

const newTodoInput = new NewTodoInput();

export default newTodoInput;
