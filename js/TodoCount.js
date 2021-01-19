`use strict`;

class TodoCount {
  constructor() {
    // const $todoCount = document.querySelector('.todo-count');
    // this.$todoCount = $todoCount;
  }
  static count = 0;
  static $todoCount = document.querySelector('.todo-count');

  static update(count) {
    this.count = count;
    this.$todoCount.firstElementChild.innerHTML = count;
  }
}

export default TodoCount;
