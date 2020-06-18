import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';

export default class CounterContainer {
  constructor({ totalCount, selectedFilter }) {
    this.todoCount = new TodoCount({
      $element: document.getElementsByClassName('todo-count')[0],
      count: totalCount
    });

    this.todoFilter = new TodoFilter({
      $element: document.querySelector('ul.filters'),
      selectedFilter
    });
  }

  setState({ newCount, newFilter }) {
    this.todoCount.setState(newCount);
    this.todoFilter.setState(newFilter);
  }
}
