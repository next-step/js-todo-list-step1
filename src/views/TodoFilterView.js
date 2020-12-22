import Views from './Views.js';

import { EVENT, CLASS } from '../utils/constants.js';

const tag = `[TodoFilterView]`;
export default class TodoFilterView extends Views {
  setupFilterTodo() {
    console.log(`${tag} setupRenderResult()`);
    this.$todoFilters = document.querySelector('.filters');
    this.init(this.$todoFilters);
    this.bindChangeFilterEvent();
    return this;
  }

  bindChangeFilterEvent() {
    this.$element
      .querySelectorAll('a')
      .forEach((filter) =>
        filter.addEventListener(EVENT.CLICK, (e) => this.onFilterTodoHandler(e.target))
      );
  }

  onFilterTodoHandler(targetTag) {
    const filter = targetTag.classList;
    this.emit('filterTodo', filter[0]);
  }

  addSelectedClass(targetFilter) {
    this.$element.querySelectorAll('a').forEach((filter) => {
      if (filter.classList.contains(CLASS.SELECTED)) {
        filter.classList.remove(CLASS.SELECTED);
      }
      if (filter.classList[0] === targetFilter) filter.classList.add(CLASS.SELECTED);
    });
  }
}
