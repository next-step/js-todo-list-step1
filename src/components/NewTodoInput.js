import todosSubject from '../subjects/TodosSubject.js';

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
        // notify
        todosSubject.createTodo(e.target.value);
        e.target.value = '';
        window.location.hash = '#';
      }
    });
  }
}

const newTodoInput = new NewTodoInput();

export default newTodoInput;
