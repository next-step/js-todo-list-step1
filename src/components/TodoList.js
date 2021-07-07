import Component from '../core/component.js';
import { $ } from '../utils/utils.js';
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
    this.$target.addEventListener('click', (e) => {
      console.log(1);
      if (e.target.classList.contains(todoButton.TOGGLE)) {
        const checkId = e.target.id;
        // this.$target.removeChild(target.closest('.todo'));
        e.target.closest('.todo').classList.toggle('completed');
        return;
        // console.log(target.closest('.todo'));
        // this.props.deleteTodo(checkId);
      }
      e.stopPropagation();
      // if (target.classList.contains(todoButton.DESTROY)) {
      // }
    });
  }
}
