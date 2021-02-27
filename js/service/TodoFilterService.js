import { $store } from "/js/Store/TodoStore.js";
import { todoView } from "/js/view/TodoView.js";

function TodoFilterService() {
  this.todoView = todoView;

  this.onClickFilter = function (filterState) {
    $store.setFilterState(filterState);
    this.todoView.render($store.getItemsByFilter());
  };
}

export const todoFilterService = new TodoFilterService();
