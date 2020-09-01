import { ALL, COMPLETED, ACTIVE, SELECTED } from "../utils/data.js";

export default function TodoFilter({ elementId, filterType, filterTodo }) {
  this.init = () => {
    if (!(this instanceof TodoFilter)) {
      throw new Error(`Invalid function call ${this}`);
    }
    this.state = {
      filterType: filterType,
    };
    this.$todoFilter = document.querySelector(`.${elementId}`);
    this.filterTodo = filterTodo;
  };
  this.switchFilter = (type) => {
    if (type === `#${ACTIVE}`) {
      this.filterTodo({
        type: ACTIVE,
      });
    } else if (type === `#${COMPLETED}`) {
      this.filterTodo({
        type: COMPLETED,
      });
    } else {
      this.filterTodo({
        type: ALL,
      });
    }
  };
  this.render = () => {
    [...this.$todoFilter.childNodes].forEach((el) => {
      if (
        el.tagName === "LI" &&
        !el.childNodes[1].classList.contains(this.state.filterType)
      ) {
        el.childNodes[1].classList.remove(SELECTED);
      } else if (
        el.tagName === "LI" &&
        el.childNodes[1].classList.contains(this.state.filterType) &&
        !el.childNodes[1].classList.contains(SELECTED)
      ) {
        el.childNodes[1].classList.add(SELECTED);
      }
    });
  };
  this.clickHandler = (evt) => {
    if (
      evt.target.tagName === "A" &&
      !evt.target.classList.contains(SELECTED)
    ) {
      this.switchFilter(evt.target.hash);
    }
  };
  this.bindEventListener = () => {
    this.$todoFilter.addEventListener("click", this.clickHandler);
  };
  this.setState = (type) => {
    this.state.filterType = type;
    this.render();
  };
  this.init();
  this.bindEventListener();
}
