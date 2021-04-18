import { $ } from '../utils/QuerySelector.js';
export default class TodoCount {
  constructor(todoCount) {
    this.todoCount = todoCount;
    this.$todoCount = $('.todo-count');

    this.render(todoCount);
  }

  setState(todoCount) {
    this.todoCount = todoCount;

    this.render(todoCount);
  }

  render(todoCount) {
    this.$todoCount.innerHTML = `
      <span class="todo-count">총 <strong>${todoCount}</strong> 개</span>
    `;
  }
}
