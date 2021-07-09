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
      <li class="todo" data-id=${id}>
        <div class="view">
          <input class="toggle" type="checkbox" data-id=${id} />
          <label class="label">${todo}</label>
          <button class="destroy" data-id=${id}></button>
        </div>
        <input class="edit" value="${todo}" data-id=${id} />
      </li>
    `;
  }

  bindEvents() {
    $$('.todo').forEach((item) => {
      item.addEventListener('click', ({ target }) => {
        const classList = target.classList;
        const targetId = Number(target.dataset.id);
        if (classList.contains(TODO_BUTTONS.TOGGLE)) {
          target.closest('.todo').classList.toggle('completed');
          this.props.checkTodo(targetId);
        }

        if (classList.contains(TODO_BUTTONS.DESTROY)) {
          const removeTarget = target.closest('.todo');
          this.$target.removeChild(removeTarget);
          this.props.deleteTodo(targetId);
        }
      });

      item.addEventListener('dblclick', ({ target }) => {
        const classList = target.classList;
        if (classList.contains(TODO_BUTTONS.LABEL)) {
          target.closest('.todo').classList.add('editing');
          target.closest('.todo').querySelector('.edit').focus();
        }
      });

      item.addEventListener('keyup', ({ target, key }) => {
        const targetId = Number(target.dataset.id);
        const editTarget = target.closest('.todo');
        if (key === 'Enter') {
          editTarget.classList.add('view');
          editTarget.classList.remove('editing');
          this.props.editTodo(targetId, target.value);
          return;
        }

        if (key === 'Escape') {
          editTarget.classList.add('view');
          editTarget.classList.remove('editing');
          return;
        }
      });
    });
  }
}
