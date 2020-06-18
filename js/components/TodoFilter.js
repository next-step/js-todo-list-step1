import { FILTER } from '../constants.js';

export default class TodoFilter {
  constructor(props) {
    const { $element, selectedFilter } = props;
    this.$element = $element;
    this.selectedFilter = selectedFilter;
    this.render();
  }

  getSelected(filter) {
    return this.selectedFilter === filter ? 'selected' : '';
  }

  render() {
    const $filterElements = this.$element.getElementsByTagName('a');

    $filterElements[0].className = `${FILTER.ALL} ${this.getSelected('')}`;
    $filterElements[1].className = `${FILTER.ACTIVE} ${this.getSelected(FILTER.ACTIVE)}`;
    $filterElements[2].className = `${FILTER.COMPLETED} ${this.getSelected(FILTER.COMPLETED)}`;
  }

  setState(newFilter) {
    this.selectedFilter = newFilter;
    this.render();
  }
}
