import * as template from './utils/templates.js';
import { ERRORTYPE, FILTERNAME } from './utils/constants.js';

export default class TodoCount {
  constructor({ data, filterType, $target, $targetTodoFilters }) {
    this.data = data;
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
    switch (this.filterType) {
      case FILTERNAME.ALL:
        this.filteredData = this.data;
        break;
      case FILTERNAME.ACTIVE:
        this.filteredData = this.data.filter(
          (todo) => todo.isCompleted === false,
        );
        break;
      case FILTERNAME.COMPLETED:
        this.filteredData = this.data.filter(
          (todo) => todo.isCompleted === true,
        );
        break;
      default:
        console.error(ERRORTYPE.NOMATCHFILTER);
        break;
    }

    this.$target.innerHTML =
      this.filteredData && template.TODOCOUNT(this.filteredData.length);
  }
}
