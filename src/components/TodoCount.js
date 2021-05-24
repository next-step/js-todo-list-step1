import { $ } from '../utils/QuerySelector.js';
export default class TodoCount {
  constructor(count) {
    this.count = count;

    this.$countView = $('.todo-count');

    this.render(count);
  }

  setState(count) {
    this.count = count;

    this.render(count);
  }

  render(count) {
    this.$countView.innerHTML = `
      <span class="todo-count">총 <strong>${count}</strong> 개</span>
    `;
  }
}
