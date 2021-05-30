import { FILTER } from '../constants/constatns.js';

export default class TodoCount {
  constructor({ target, setFilter }) {
    this.$target = target;

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

  updateCount(count) {
    const $count = this.$target.querySelector('span > strong');
    $count.innerHTML = count;
  }

  _changeFilter(event) {
    event.stopPropagation();
    const filter = event.target.classList[0];

    if (!(filter === FILTER.ALL || filter === FILTER.ACTIVE || filter === FILTER.COMPLETED)) return;

    Object.keys(this.$filterMenu).map((key) => this.$filterMenu[key].classList.remove('selected'));

    event.target.classList.add('selected');

    this.setFilter(filter);
  }
}
