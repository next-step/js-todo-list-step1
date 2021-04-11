import { SELECTOR, CLASS_NAME, STATUS } from '../utils/constant.js';

const statusByIndex = {
  0: STATUS.ALL,
  1: STATUS.ACTIVE,
  2: STATUS.COMPLETED,
};

class TodoFilters {
  constructor(store) {
    this.store = store;
    this.bindEvent();
  }

  bindEvent() {
    const container = document.querySelector(SELECTOR.FILTER);
    container.addEventListener('click', ({ target }) => this.onClick(target));
  }

  /**
   * @param {EventTarget} target
   */
  onClick(target) {
    const $filters = target.closest(SELECTOR.FILTER).children;
    this.resetStatus($filters);
    const status = target.className;
    target.className += CLASS_NAME.SELECTED;
    this.store.setStatus(status);
  }

  /**
   * @param {HTMLCollection} filters
   */
  resetStatus(filters) {
    for (let i = 0; i < 3; i++) {
      const $anchor = filters[i].children[0];
      $anchor.className = statusByIndex[i];
    }
  }
}

export default TodoFilters;
