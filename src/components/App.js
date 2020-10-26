import { action } from '../utils/action.js';
import TodoList from './TodoList.js';

export default class App {
  constructor() {
    this.$NewTodoInput = document.querySelector('#new-todo-title');
    this.$TodoList = document.querySelector('#todo-list');
    this.$TodoCount = document.querySelector('.todo-count strong');
    this.attachEventListner();
    action.subscribe('store', 'update', (e) => this.setState(e.detail));
  }

  attachEventListner() {
    this.$TodoList.addEventListener('click', (e) => this.onClickHandler(e));
    this.$NewTodoInput.addEventListener('keypress', (e) =>
      this.onKeypressHandler(e)
    );
    window.addEventListener('hashchange', () => {
      action.publish('view', 'fetchTodo');
    });
  }

  onClickHandler({ target }) {
    const { className } = target;
    const $TodoItem = target.closest('li');
    const id = Number($TodoItem.dataset.id);

    if (className.includes('toggle')) {
      action.publish('view', 'toggleTodo', id);
    } else if (className === 'destroy') {
      action.publish('view', 'removeTodo', id);
    }
  }

  onKeypressHandler({ key, target }) {
    if (key === 'Enter') {
      action.publish('view', 'addTodo', {
        title: target.value,
        isDone: location.hash === '#completed',
      });
      target.value = '';
    }
  }

  setState(todos) {
    this.render(todos);
  }

  render(todos) {
    this.TodoList = new TodoList(todos);
    this.$TodoCount.innerText = todos.length;
  }
}
