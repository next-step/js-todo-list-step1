import { todoFilter } from "/js/object/TodoFilter.js";
import { $store } from "/js/object/TodoStore.js";
import { todoView } from "/js/view/TodoView.js";
import { FILTER_STATE } from "/js/utils/constants.js";

function TodoFilterService() {
  this.todoFilter = todoFilter;
  this.todoView = todoView;

  this.onClickAllView = function () {
    this.todoFilter.state = FILTER_STATE.ALL;
    this.todoView.render($store.getAllItems());
  };

  this.onClickActiveView = function () {
    this.todoFilter.state = FILTER_STATE.ACTIVE;
    this.todoView.render($store.getActiveItems());
  };

  this.onClickCompletedView = function () {
    this.todoFilter.state = FILTER_STATE.COMPLETED;
    this.todoView.render($store.getCompletedItems());
  };
}

export const todoFilterService = new TodoFilterService();
