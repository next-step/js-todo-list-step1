import { SELECTOR, CLASS_NAME } from '../utils/constant.js';

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
    this.resetStatus($filters); // Filter 내부 ClassName 초기화
    const status = target.className; // 현재 target 의 className = 새로 바뀔 status
    target.classList.add(CLASS_NAME.SELECTED);
    this.store.setStatus(status);
  }

  /**
   * filters 내부 Element들 className 초기화 메서드
   * @param {HTMLCollection} filters
   */
  resetStatus(filters) {
    for (let i = 0; i < 3; i++) {
      const $anchor = filters[i].children[0];
      $anchor.classList.remove(CLASS_NAME.SELECTED);
    }
  }
}

export default TodoFilters;
