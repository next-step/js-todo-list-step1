import { todoController } from "/js/controller/TodoController.js";
import { todoView } from "/js/TodoView.js";
import { $store } from "/js/DB/TodoStore.js";

function TodoApp() {
  this.controller = todoController;
  this.view = todoView;

  this.init = function () {
    this.controller.init();
    this.view.render($store.items);
  };
}

const todoApp = new TodoApp();
todoApp.init();
