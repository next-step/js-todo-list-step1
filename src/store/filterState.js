import { FILTER } from '../constants/constatns.js';

class FilterState {
  constructor() {
    this._filter = FILTER.ALL;
  }

  get() {
    return this._filter;
  }

  setFilter(updateFilter) {
    this._filter = updateFilter;
  }
}

export default new FilterState();
