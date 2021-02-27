import { todoView } from "/js/TodoView.js";
import { $store } from "/js/DB/TodoStore.js";

function TodoWriterService() {
  this.todoView = todoView;

  this.addNewItem = function (item, $newTodoTitle) {
    if (isEmpty(item.title)) {
      return;
    }

    $store.push(item);
    this.todoView.render($store.items);

    clear($newTodoTitle);
  };

  function isEmpty(title) {
    return !title || /^\s*$/.test(title);
  }

  function clear($newTodoTitle) {
    $newTodoTitle.value = "";
  }
}

export const todoWriterService = new TodoWriterService();
