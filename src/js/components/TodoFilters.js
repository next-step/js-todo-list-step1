import { SELECTOR } from '../utils/constant.js';

class TodoFilters {
  constructor(store) {
    this.store = store;
    this.container = document.querySelector(`.${SELECTOR.FILTER}`);
    this.bindEvent();
  }

  bindEvent() {
    this.container.addEventListener('click', ({ target }) => {
      this.container;
      const status = target.className;
      // target.className += ' selected';
      this.store.setStatus(status);
    });
  }
}

export default TodoFilters;
