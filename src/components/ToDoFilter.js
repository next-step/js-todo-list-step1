import { Component } from "../core/Component.js";
import { SET_FILTER_TYPE, toDoStore } from "../store/toDoStore.js";

const filterButtons = [
  { type: 'all', text: '전체보기' },
  { type: 'active', text: '해야할 일' },
  { type: 'completed', text: '완료한 일' },
];

export const ToDoFilter = class extends Component {

  constructor (target) {
    super(target, {});
  }

  _render () {
    const { filterType } = toDoStore.$state;
    this.$target.innerHTML = filterButtons.map(({ type, text }, index) => `
      <li>
        <a class="${type} ${type === filterType ? 'selected' : ''}"
           href="#"
           data-filter-type="${type}">
          ${text}
        </a>
      </li>
    `).join('');
  }

  _initEventListener () {
    this.$target.addEventListener('click', e => {
      e.preventDefault();
      const { target } = e;
      if (target.tagName === 'A') {
        toDoStore.commit(SET_FILTER_TYPE, target.dataset.filterType);
      }
    })
  }
}