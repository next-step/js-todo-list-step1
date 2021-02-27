import { todoItemTemplate } from "/js/utils/templates.js";

function TodoView() {
  const $list = document.getElementById("todo-list");

  this.render = (items) => {
    $list.innerHTML = items.map(todoItemTemplate).join("");
  };
}

export const todoView = new TodoView();
