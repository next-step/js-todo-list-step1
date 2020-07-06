import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';
import { $TODO_COUNT, $TODO_FILTER } from '../config.js';

export default class FilterContainer {
  constructor({ totalCount, selectedFilter }) {
    this.todoCount = new TodoCount({
      $element: $TODO_COUNT,
      count: totalCount
    });

    this.todoFilter = new TodoFilter({
      $element: $TODO_FILTER,
      selectedFilter
    });
  }

  setState({ newCount, newFilter }) {
    this.todoCount.setState(newCount);
    this.todoFilter.setState(newFilter);
  }
}
