import TodoItem from './TodoItem.js';

export default class TodoList {
  constructor(todos) {
    this.$el = document.querySelector('#todo-list');
    this.setState(todos);
    this.attachEventListner();
  }

  attachEventListner() {
    this.$el.addEventListener('dblclick', (e) => this.onDoubleClickHandler(e));
    this.$el.addEventListener('keydown', (e) => this.onKeydownHandler(e));
  }

  onDoubleClickHandler({ target }) {
    const { className } = target;
    const $TodoItem = target.closest('li');

    if (className === 'label') {
      $TodoItem.classList.add('editing');
    }
  }

  onKeydownHandler({ key, target }) {
    if (key !== 'Escape' && key !== 'Enter') {
      return;
    }

    const $TodoItem = target.closest('li');
    const $Label = $TodoItem.querySelector('.label');
    const $Edit = $TodoItem.querySelector('.edit');

    if (key === 'Escape') {
      $Edit.value = $Label.innerText;
    }
    if (key === 'Enter') {
      target.setAttribute('value', target.value);
      $Label.innerText = target.value;
    }

    $TodoItem.classList.remove('editing');
  }

  setState(todos) {
    this.$el.innerHTML = '';
    this.render(todos);
  }

  render(todos) {
    todos.forEach((todo) => {
      this.$el.prepend(TodoItem(todo));
    });
  }
}
