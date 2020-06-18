import * as templates from './utils/templates.js';
import * as funcs from './utils/funcs.js';

export default class TodoCount {
  constructor({ data, filteredData, filterType, $target, $targetTodoFilters }) {
    this.data = data;
    this.filteredData = filteredData;
    this.filterType = filterType;
    this.$target = $target;
    this.$targetTodoFilters = $targetTodoFilters;

    this.render();
  }
  setState(nextData, nextFilterType) {
    this.data = nextData;
    this.filterType = nextFilterType;
    this.render();
  }
  render() {
    this.filteredData = funcs.filteringData(this.filterType, this.data);

    this.$target.innerHTML =
      this.filteredData && templates.TODOCOUNT(this.filteredData.length);
  }
}
