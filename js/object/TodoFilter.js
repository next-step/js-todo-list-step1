import { FILTER_STATE } from "/js/utils/constants.js";

function TodoFilter() {
  this.state = FILTER_STATE.ALL;
}

export const todoFilter = new TodoFilter();
