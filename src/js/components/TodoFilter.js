import { FILTER_TYPES, TODO_FILTER_MENU } from '../../utils/const.js';
export default function TodoFilter({ $app, initialState, onFilter }) {
  this.state = initialState;

  this.$target = document.createElement('div');
  this.$target.className = 'count-container';
  $app.appendChild(this.$target);
  const $nodeTodoFilter = this.$target;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $nodeTodoFilter.addEventListener('click', (e) => {
    const $node = e.target;

    if ($node.className === FILTER_TYPES.COMPLETE) {
      onFilter(FILTER_TYPES.COMPLETE);
    } else if ($node.className === FILTER_TYPES.ACTIVE) {
      onFilter(FILTER_TYPES.ACTIVE);
    } else {
      onFilter(FILTER_TYPES.ALL);
    }
  });

  this.render = () => {
    const { todoes, isFilter, todoesFiltered } = this.state;

    const todoTotalCount = isFilter ? todoesFiltered.length : todoes.length;
    const todoFilterTemplate = `
      <span class="todo-count">총 <strong>${todoTotalCount}</strong> 개</span>
      <ul class="filters">
        <li>
          <a class=${FILTER_TYPES.ALL} href="#">${TODO_FILTER_MENU.ALL_MENU}</a>
        </li>
        <li>
          <a class=${FILTER_TYPES.ACTIVE} href="#${FILTER_TYPES.ACTIVE}">${TODO_FILTER_MENU.ACTIVE_MENU}</a>
        </li>
        <li>
          <a class="completed" href="#${FILTER_TYPES.COMPLETE}">${TODO_FILTER_MENU.COMPLETE_MENU}</a>
        </li>
      </ul>`;
    $nodeTodoFilter.innerHTML = todoFilterTemplate;
  };
}
