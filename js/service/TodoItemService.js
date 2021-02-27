import { $store } from "/js/Store/TodoStore.js";
import { todoView } from "/js/view/TodoView.js";

function TodoItemService() {
  this.todoView = todoView;

  this.toggle = function (item) {
    $store.toggle(item.dataset.id);
    item.classList.toggle("completed");
  };

  this.destroy = function (item) {
    if (confirm("삭제하시겠습니까?")) {
      $store.destroy(item.dataset.id);
      this.todoView.render($store.items);
    }
  };

  this.onEdit = function (item) {
    item.classList.add("editing");
  };

  this.edit = function (id, title) {
    $store.edit(id, title);
    this.todoView.render($store.items);
  };
}

export const todoItemService = new TodoItemService();
