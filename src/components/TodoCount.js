export default class TodoCount {
  $target = null;
  $count = null;
  $todoCount = null;

  constructor($target, $count) {
    this.$target = $target;
    this.$count = $count;
    const TodoCount = document.createElement("div");
    this.$todoCount = TodoCount;
    this.$todoCount.classList.add("count-container");

    this.$target.appendChild(this.$todoCount);
    this.render();
  }

  render() {
    this.$todoCount.innerHTML = `
        <span class="todo-count">총 <strong>${this.$count}</strong> 개</span>
            <ul class="filters">
            <li>
                <a class="all selected" href="#">전체보기</a>
            </li>
            <li>
                <a class="active" href="#active">해야할 일</a>
            </li>
            <li>
                <a class="completed" href="#completed">완료한 일</a>
            </li>
        </ul>
    `;
  }
}
