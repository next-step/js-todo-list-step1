export default class TodoCount {
  constructor(todoCount) {
    this.$todoCount = document.querySelector('.todo-count');
    this.todoCount = todoCount;
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
