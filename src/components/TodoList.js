import { ALL, COMPLETED } from '../constants/todoState.js';

export default class TodoList {
  constructor({ $app, initialState, toggleTodo, removeTodo, modifyTodo }) {
    this.state = initialState;
    const $target = document.createElement('main');

    const toggleAll = document.createElement('input');
    toggleAll.className = 'toggle-all';
    toggleAll.type = 'checkbox';

    this.$todolist = document.createElement('ul');
    this.$todolist.id = 'todo-list';
    this.$todolist.className = 'todo-list';

    this.$todolist.addEventListener('click', ({ target }) => {
      if (target.className === 'toggle') {
        toggleTodo(Number(target.closest('li').dataset.id));
      } else if (target.className === 'destroy') {
        removeTodo(Number(target.closest('li').dataset.id));
      }
    });

    this.$todolist.addEventListener('dblclick', ({ target }) => {
      console.log(target.className);
      if (target.className !== 'label') return;
      const todo = target.closest('li');
      todo.className += ' editing';
      todo.addEventListener('keypress', event => {
        if (event.key === 'Enter' && event.target.value !== '') {
          modifyTodo(Number(todo.dataset.id), event.target.value);
        }
      });
    });

    $target.appendChild(toggleAll);
    $target.appendChild(this.$todolist);
    $app.appendChild($target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$todolist.innerHTML = `${this.state.todos
      .filter(todo => {
        if (this.state.show === ALL) return true;
        return this.state.show === todo.state;
      })
      .map(todo => {
        return `
        <li data-id="${todo.id}" class="${todo.state}">
          <div class="view">
            <input class="toggle" type="checkbox"
              ${todo.state === COMPLETED ? 'checked' : ''} />
            <label class="label">${todo.title}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todo.title}" />
        </li>`;
      })
      .join('')}`;
  }
}
