import { $ } from '../utils/querySelector.js';

export default class TodoCountView {
  constructor() {
    this._filterContainer = $('.filters');
    this._todoCount = 0;
    this._countView = $('.todo-count').children[0];
    this._currentFilterView = $('.all', this._filterContainer);
    this._currentFilter = 'all';
  }

  increaseTodoCount() {
    this._todoCount++;
  }

  decreaseTodoCount() {
    this._todoCount--;
  }

  setTodoCount(count) {
    this._countView.innerText = count;
  }

  getInnerTextCount() {
    return +this._countView.innerText;
  }

  getTodoCount() {
    return this._todoCount;
  }

  getCurrentFilter() {
    return this._currentFilter;
  }

  setSelectFilter(filter) {
    this._currentFilterView.classList.remove('selected');
    this._currentFilter = filter.className;
    this._currentFilterView = filter;
    this._currentFilterView.classList.add('selected');
  }

  setSelectAllEvent(callback) {
    this._filterContainer.addEventListener('click', (event) => {
      const filter = event.target.closest('.all');
      if (!filter) {
        return;
      }
      this.setSelectFilter(filter);
      callback();
    });
  }

  setSelectActiveEvent(callback) {
    this._filterContainer.addEventListener('click', (event) => {
      const filter = event.target.closest('.active');
      if (!filter) {
        return;
      }
      this.setSelectFilter(filter);
      callback();
    });
  }

  setSelectCompletedEvent(callback) {
    this._filterContainer.addEventListener('click', (event) => {
      const filter = event.target.closest('.completed');
      if (!filter) {
        return;
      }
      this.setSelectFilter(filter);
      callback();
    });
  }
}
