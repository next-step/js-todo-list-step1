import { $ } from '../utils/utils.js';
import { DOM_ID, FILTER } from '../constants/constatns.js';

export default class TodoCount {
  constructor({ setFilter }) {
    this.$target = $(DOM_ID.TODO_COUNT);

    this.$filterMenu = {
      [FILTER.ALL]: this.$target.querySelector(`.${FILTER.ALL}`),
      [FILTER.ACTIVE]: this.$target.querySelector(`.${FILTER.ACTIVE}`),
      [FILTER.COMPLETED]: this.$target.querySelector(`.${FILTER.COMPLETED}`),
    };

    this.setFilter = setFilter;

    this._addEvent();
  }

  _addEvent() {
    this.$target.addEventListener('click', this._changeFilter.bind(this));
  }

  _changeFilter(event) {
    event.stopPropagation();

    const filter = event.target.classList[0];
    if (!(filter === FILTER.ALL || filter === FILTER.ACTIVE || filter === FILTER.COMPLETED)) return;
    Object.keys(this.$filterMenu).map((key) => this.$filterMenu[key].classList.remove('selected'));
    event.target.classList.add('selected');

    this.setFilter(filter);
  }

  renderCount(count) {
    const $count = this.$target.querySelector('span > strong');
    $count.innerHTML = count;
  }
}
