import { todoView } from "/js/TodoView.js";
import { $store } from "/js/DB/TodoStore.js";
import { todoController } from "/js/controller/TodoController.js";

function TodoAppService() {
  this.printer = todoView;

  this.addNewItem = function (item) {
    $store.push(item);
    this.printer.render($store.items);

    todoController.clear();
  };

  this.toggle = function (item) {
    $store.toggle(item.dataset.id);
    item.classList.toggle("completed");
  };

  this.destroy = function (item) {
    $store.destroy(item.dataset.id);
    this.printer.render($store.items);
  };

  this.onEdit = function (item) {
    item.classList.add("editing");
  };

  this.edit = function (id, title) {
    $store.edit(id, title);
    this.printer.render($store.items);
  };
}

export const todoAppService = new TodoAppService();
