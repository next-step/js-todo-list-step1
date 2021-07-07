import Component from '../core/component.js';
import { $, $$ } from '../utils/utils.js';
import { TODO_BUTTONS } from '../utils/constants.js';

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
        const classList = target.classList;
        const checkId = Number(target.id);
        if (classList.contains(TODO_BUTTONS.TOGGLE)) {
          target.closest('.todo').classList.toggle('completed');
          this.props.checkTodo(checkId);
        }

        if (classList.contains(TODO_BUTTONS.DESTROY)) {
          const removeTarget = target.closest('.todo');
          this.$target.removeChild(removeTarget);
          this.props.deleteTodo(checkId);
        }
      });
    });
  }
}
