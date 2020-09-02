import {Component} from "../_core";
import {toDoStore} from "../store";

export const CountContainer = class extends Component {

  constructor (target) {
    super(target, {
      filters: [
        { type: 'all', text: '전체보기' },
        { type: 'active', text: '해야할 일' },
        { type: 'completed', text: '완료한 일' },
      ],
      selectedIndex: 0
    });
  }

  get #selectedType () {
    const { filters, selectedIndex } = this.$state;
    return filters[selectedIndex].type;
  }

  get filteredItemsCount () {
    return toDoStore.$getters.filteredItems.length;
  }

  render () {
    const { filters, selectedIndex } = this.$state;
    this.$target.innerHTML = `
      <span class="todo-count">총 <strong>${this.filteredItemsCount}</strong> 개</span>
      <ul class="filters">
        ${filters.map(({ type, text }, index) => `
          <li>
            <a class="${type} ${index === selectedIndex ? 'selected' : ''}"
               href="#"
               data-index="${index}">
              ${text}
            </a>
          </li>
        `).join('')}
      </ul>
    `;
  }

  _initEventListener () {
    this.$target.addEventListener('click', e => {
      e.preventDefault();
      const { target } = e;
      if (target.tagName === 'A') {
        const selectedIndex = Number(target.dataset.index)
        super.setState({ selectedIndex });
        this.#selectType(this.#selectedType);
      }
    })
  }

  #selectType (type) {
    toDoStore.commit('SET_TYPE', type);
  }
}