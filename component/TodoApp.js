import { TodoInput } from "./TodoInput.js";
import { TodoItem } from "./TodoItem.js";
import { TodoList } from "./TodoList.js";
import { TodoCount } from "./TodoCount.js";
import { LocalStorageUtil } from "../js/LocalStorageUtil.js";
import { Store } from "../js/Store.js";

export class TodoApp {
  constructor(todoItem) {
    this.storage = new LocalStorageUtil();
    this.todoItem = todoItem || [];
    this.todoList = new TodoList();
    this.todoCount = new TodoCount();
    this.store = new Store();

    new TodoInput({
      onAdd: (contents) => {
        let todoItem = new TodoItem(contents);
        this.storage.setLocalStorage(todoItem);
        this.store.addStore(todoItem);
        // let todoItem2 = new TodoItem(this.storage.getLocalStoage(todoItem));
        this.todoItem.push(todoItem);
        this.setState(this.todoItem, this.store);
      },
    });
  }

  setState(updateItem) {
    this.todoItem = updateItem;
    console.log(this.store);
    this.todoList.setState(this.todoItem, this.store);
    this.todoCount.setState(this.todoItem, this.store);
  }
}
