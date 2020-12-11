import { TodoInput } from "./TodoInput.js";
import { TodoItem } from "./TodoItem.js";
import { TodoList } from "./TodoList.js";
import { TodoCount } from "./TodoCount.js";
import { TodoFilter } from "./TodoFilter.js";
import { LocalStorageUtil } from "../js/LocalStorageUtil.js";

export class TodoApp {
  constructor(todoItem) {
    this.storage = new LocalStorageUtil();
    this.todoCount = new TodoCount(this.storage.storageTodo());
    this.todoFilter = new TodoFilter(this.todoList);

    new TodoInput({
      onAdd: (contents) => {
        this.storage.setLocalStorage(contents);
        this.setState(this.storage.storageTodo());
      },
    });
  }

  setState(updateItem) {
    this.todoItem = updateItem;
    this.todoFilter.setState(this.todoItem);
    this.todoCount.setState(this.todoItem);
  }
}
