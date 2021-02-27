import { todoItemController } from "/js/controller/TodoItemController.js";
import { todoView } from "/js/TodoView.js";
import { $store } from "/js/DB/TodoStore.js";
import { todoWriterController } from "/js/controller/TodoWriterController.js";

function TodoApp() {
  this.todoWriterController = todoWriterController;
  this.todoItemController = todoItemController;
  this.view = todoView;

  this.init = function () {
    this.todoWriterController.init();
    this.todoItemController.init()
    this.view.render($store.items);
  };
}

const todoApp = new TodoApp();
todoApp.init();
