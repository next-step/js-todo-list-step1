import { todoFilterService } from "/js/service/TodoFilterService.js";
import { FILTER_STATE } from "/js/utils/constants.js";

function TodoFilterController() {
  this.todoFilterService = todoFilterService;

  const $filter = document.getElementById("count-container");

  const onClickFilter = ({ target }) => {
    console.log(target);
    if (isAllViewButton(target)) {
      this.todoFilterService.onClickAllView();
      return;
    }

    if (isActiveViewButton(target)) {
      this.todoFilterService.onClickActiveView();
      return;
    }

    if (isCompletedViewButton(target)) {
      this.todoFilterService.onClickCompletedView();
    }
  };

  function isAllViewButton(target) {
    return target.classList.contains(FILTER_STATE.ALL);
  }
  function isActiveViewButton(target) {
    return target.classList.contains(FILTER_STATE.ACTIVE);
  }
  function isCompletedViewButton(target) {
    return target.classList.contains(FILTER_STATE.COMPLETED);
  }

  this.init = function () {
    $filter.addEventListener("click", onClickFilter);
  };
}

export const todoFilterController = new TodoFilterController();
