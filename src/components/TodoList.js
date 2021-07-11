import Component from '../core/component.js';
import { $, $$ } from '../utils/utils.js';
import { TODO_BUTTONS } from '../utils/constants.js';

export default class TodoList extends Component {
  setState(newState) {
    this.todoList = newState || this.props.todoList;
  }

  render() {
    console.log(this.todoList);
    const todoList = this.todoList.reduce(
      (html, { id, todo, checked }) => (html += this.renderTodo({ id, todo, checked })),
      '',
    );
    this.$target.innerHTML = todoList;
  }

  renderTodo({ id, todo, checked }) {
    const checkTodo = checked ? 'completed' : '';
    return `
      <li class="todo ${checkTodo}" data-id=${id}>
        <div class="view">
          ${this.checkCheckbox(id, checked)}
          <label class="label">${todo}</label>
          <button class="destroy" data-id=${id}></button>
        </div>
        <input class="edit" value="${todo}" data-id=${id} />
      </li>
    `;
  }

  checkCheckbox(id, checked) {
    return checked
      ? `<input class="toggle" type="checkbox" data-id=${id} checked />`
      : `<input class="toggle" type="checkbox" data-id=${id} />`;
  }

  bindEvents() {
    $$('.todo').forEach((item) => {
      item.addEventListener('click', ({ target }) => {
        const classList = target.classList;
        const targetId = Number(target.dataset.id);
        if (classList.contains(TODO_BUTTONS.TOGGLE)) {
          target.closest('.todo').classList.toggle('completed');
          this.props.checkTodo(targetId);
          console.log(targetId);
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
