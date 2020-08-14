import { FilterType } from "../constants.js";
import { isFunction } from "../utils.js";

function TodoFilter($target, type, eventHandler) {
  if (!new.target) {
    throw new Error("Create instance with 'new'");
  }

  if (!eventHandler || !isFunction(eventHandler.onChangeType)) {
    throw new Error("Wrong eventHandler");
  }

  this.type = type;

  this.setState = (newType) => {
    this.type = newType;
    this.render();
  };

  this.bindEvnet = () => {
    $target.addEventListener("click", (event) => {
      if (event.target.classList.contains(FilterType.ALL)) {
        eventHandler.onChangeType(FilterType.ALL);
      } else if (event.target.classList.contains(FilterType.ACTIVE)) {
        eventHandler.onChangeType(FilterType.ACTIVE);
      } else if (event.target.classList.contains(FilterType.COMPLETED)) {
        eventHandler.onChangeType(FilterType.COMPLETED);
      }
    });
  };

  this.render = () => {
    $target.innerHTML = `
        <ul class="filters">
            <li>
                <a class="${FilterType.ALL} ${
      this.type === FilterType.ALL ? "selected" : ""
    }" href="/#">전체보기</a>
            </li>
            <li>
                <a class="${FilterType.ACTIVE} ${
      this.type === FilterType.ACTIVE ? "selected" : ""
    }" href="#active">해야할 일</a>
            </li>
            <li>
                <a class="${FilterType.COMPLETED} ${
      this.type === FilterType.COMPLETED ? "selected" : ""
    }" href="#completed">완료한 일</a>
            </li>
        </ul>;
    `;
  };

  this.render();
  this.bindEvnet();
}

export default TodoFilter;
