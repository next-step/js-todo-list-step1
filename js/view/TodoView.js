import { todoFilterTemplate, todoItemTemplate } from "/js/utils/templates.js";
import { $store } from "/js/Store/TodoStore.js";

function TodoView() {
  const $list = document.getElementById("todo-list");
  const $countContainer = document.getElementById("count-container");

  this.render = (items) => {
    $list.innerHTML = items.map(todoItemTemplate).join("");
    $countContainer.innerHTML = todoFilterTemplate({
      count: items.length,
      filter: $store.filterState,
    });
  };
}

export const todoView = new TodoView();
