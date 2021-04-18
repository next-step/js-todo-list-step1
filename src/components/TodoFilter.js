import { $ } from '../utils/QuerySelector.js';
import { EventType } from '../utils/EventType.js';
import { TagName } from '../utils/TagName.js';
import { TextType } from '../utils/TextType.js';

export const FilterType = Object.freeze({
  ALL: {
    name: 'all',
    alias: '전체보기',
    filter: (todoItems) => todoItems,
  },
  ACTIVE: {
    name: 'active',
    alias: '해야할 일',
    filter: (todoItems) => todoItems.filter((todoItem) => !todoItem.isCompleted),
  },
  COMPLETED: {
    name: 'completed',
    alias: '완료한 일',
    filter: (todoItems) => todoItems.filter((todoItem) => todoItem.isCompleted),
  },
});

export default class TodoFilter {
  constructor(filter = FilterType.ALL, { onChange }) {
    this.filter = filter;

    this.$filterButtons = $('.filters');
    this.initializeEventListener(this.$filterButtons, { onChange });

    this.render(filter);
  }

  initializeEventListener($filters, { onChange }) {
    $filters.addEventListener(EventType.CLICK, (event) => {
      this.change(event, onChange);
    });
  }

  change(event, onChange) {
    const { target } = event;
    const filter = this.findFilter(target);

    if (!this.canChange(target, filter)) {
      return;
    }

    onChange(filter);
  }

  findFilter(target) {
    return Object.values(FilterType).find((filterType) => target.classList.contains(filterType.name));
  }

  canChange(target, filter) {
    return target.tagName === TagName.A && filter;
  }

  setState(filter) {
    this.filter = filter;

    this.render(filter);
  }

  render(filter) {
    this.$filterButtons.innerHTML = Object.values(FilterType)
      .map(
        (filterType) => `
        <li>
          <a class="${filterType.name} ${filterType.name === filter.name ? 'selected' : ''}" href="#/${
          filterType.name
        }">${filterType.alias}</a>
        </li>
      `
      )
      .join(TextType.EMPTY);
  }
}
