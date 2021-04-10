import { SELECTOR, STATUS } from '../utils/constant.js';

const statusByIndex = {
  0: STATUS.ALL,
  1: STATUS.COMPLETED,
  2: STATUS.ACTIVE,
};

class TodoFilters {
  constructor(store) {
    this.store = store;
    this.bindEvent();
  }

  bindEvent() {
    const container = document.querySelector(`.${SELECTOR.FILTER}`);
    container.addEventListener('click', ({ target }) => {
      const $filters = target.closest('ul').children;
      const status = target.className;
      this.resetStatus($filters);
      target.className += ' selected';
      this.store.setStatus(status);
    });
  }

  // reset css status
  resetStatus($filters) {
    for (let i = 0; i < 3; i++) {
      const $anchor = $filters[i].children[0];
      $anchor.className = statusByIndex[i];
    }
  }
}

export default TodoFilters;
