import { $store } from "/js/object/TodoStore.js";
import { todoView } from "/js/view/TodoView.js";
import { todoItemController } from "/js/controller/TodoItemController.js";
import { todoWriterController } from "/js/controller/TodoWriterController.js";
import { todoFilterController } from "/js/controller/TodoFilterController.js";

function TodoApp() {
  this.todoWriterController = todoWriterController;
  this.todoItemController = todoItemController;
  this.todoFilterController = todoFilterController;
  this.view = todoView;

  this.init = function () {
    this.todoWriterController.init();
    this.todoItemController.init();
    this.todoFilterController.init();
    this.view.render($store.items);
  };
}

const todoApp = new TodoApp();
todoApp.init();
