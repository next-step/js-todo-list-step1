import { todoFilterTemplate, todoItemTemplate } from "/js/utils/templates.js";
import { todoFilter } from "/js/object/TodoFilter.js";

function TodoView() {
  this.filter = todoFilter;

  const $list = document.getElementById("todo-list");
  const $countContainer = document.getElementById("count-container");

  this.render = (items) => {
    $list.innerHTML = items.map(todoItemTemplate).join("");
    $countContainer.innerHTML = todoFilterTemplate({
      count: items.length,
      filter: this.filter.state,
    });
  };
}

export const todoView = new TodoView();
