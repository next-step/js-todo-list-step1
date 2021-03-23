import { todoFilterService } from "/js/service/TodoFilterService.js";
import { FILTER_STATE } from "/js/utils/constants.js";

function TodoFilterController() {
  this.todoFilterService = todoFilterService;

  const $filter = document.getElementById("count-container");

  const onClickFilter = ({ target }) => {
    const filterState = findFilterState(target);
    this.todoFilterService.onClickFilter(filterState);
  };

  function findFilterState(target) {
    const classList = target.classList;
    if (classList.contains(FILTER_STATE.ALL)) {
      return FILTER_STATE.ALL;
    }

    if (classList.contains(FILTER_STATE.ACTIVE)) {
      return FILTER_STATE.ACTIVE;
    }

    if (classList.contains(FILTER_STATE.COMPLETED)) {
      return FILTER_STATE.COMPLETED;
    }
  }

  this.init = function () {
    $filter.addEventListener("click", onClickFilter);
  };
}

export const todoFilterController = new TodoFilterController();
