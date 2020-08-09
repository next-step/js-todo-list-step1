import { ALL, ACTIVE, COMPLETED } from "../../utils/constants.js";
import TodoModel from "../model/todoModel.js";
import { SELECTOR } from "../../utils/constants.js";

function convertClassNameToFilterType(className) {
  switch (className) {
    case "all selected":
      return ALL;
    case "active":
      return ACTIVE;
    case "completed":
      return COMPLETED;
    default:
      throw new Error("Unhandled Case");
  }
}

export default function TodoFilter() {
  if (new.target !== TodoFilter) {
    return new TodoFilter();
  }

  this.init = () => {
    this.$target = document.querySelector(`.${SELECTOR.TODO_FILTER}`);
    this.bindEvent();
  };

  this.bindEvent = () => {
    const onClickHandler = (e) => {
      const { target } = e;
      if (target.tagName !== "A") {
        return;
      }
      e.preventDefault();
      TodoModel.changeFilterType(
        convertClassNameToFilterType(target.className)
      );
    };

    this.$target.addEventListener("click", onClickHandler);
  };

  this.init();
}
