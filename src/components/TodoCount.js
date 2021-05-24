import {
  SELETED,
  VIEW_ALL,
  VIEW_COMPLETED,
  VIEW_REMAIN,
} from "../utils/constants.js";

export default class TodoCount {
  $target = null;
  $count = null;
  $todoCount = null;
  $viewMode = null;

  constructor($target, $count, changeViewModeHandler) {
    this.$target = $target;
    this.$count = $count;
    const TodoCount = document.createElement("div");
    this.$todoCount = TodoCount;
    this.$todoCount.classList.add("count-container");
    this.$todoCount.addEventListener("click", changeViewModeHandler);

    this.$target.appendChild(this.$todoCount);
    this.$viewMode = VIEW_ALL;

    this.render();
  }

  setState($count, $viewMode) {
    this.$count = $count;
    this.$viewMode = $viewMode;
    this.render();
  }

  render() {
    this.$todoCount.innerHTML = `
        <span class="todo-count">총 <strong>${this.$count}</strong> 개</span>
            <ul class="filters">
            <li>
                <a class="all ${
                  this.$viewMode === VIEW_ALL ? SELETED : ""
                }" href="#">전체보기</a>
            </li>
            <li>
                <a class="active ${
                  this.$viewMode === VIEW_COMPLETED ? SELETED : ""
                }" href="#active">해야할 일</a>
            </li>
            <li>
                <a class="completed ${
                  this.$viewMode === VIEW_REMAIN ? SELETED : ""
                }" href="#completed">완료한 일</a>
            </li>
        </ul>
    `;
  }
}
