import Component from '../core/component.js';
import { $, $$ } from '../utils/utils.js';
import { todoButton } from '../utils/constants.js';

export default class TodoList extends Component {
  render() {
    const todoList = this.props.todoList
      .get()
      .reduce((html, { id, todo }) => (html += this.renderTodo({ id, todo })), '');
    this.$target.innerHTML = todoList;
  }

  renderTodo({ id, todo }) {
    return `
      <li class="todo" id=${id}>
        <div class="view">
          <input class="toggle" type="checkbox" id=${id} />
          <label class="label">${todo}</label>
          <button class="destroy" id=${id}></button>
        </div>
        <input class="edit" value="${todo}" />
      </li>
    `;
  }

  bindEvents() {
    $$('.todo').forEach((item) => {
      item.addEventListener('click', ({ target }) => {
        if (target.classList.contains(todoButton.TOGGLE)) {
          const checkId = Number(target.id);
          target.closest('.todo').classList.toggle('completed');
          this.props.checkTodo(checkId);
        }
      });
    });
  }
}
