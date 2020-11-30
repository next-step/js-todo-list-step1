import { TodoInput } from "./TodoInput.js";
import { TodoItem } from "./TodoItem.js";
import { TodoList } from "./TodoList.js";
import { TodoCount } from "./TodoCount.js";
import { LocalStorageUtil } from "../js/LocalStorageUtil.js";
import { Store } from "../js/Store.js";

export class TodoApp {
  constructor(todoItem) {
    this.storage = new LocalStorageUtil();
    // this.todoItem = [];
    this.todoList = new TodoList(this.storageTodo());
    this.todoCount = new TodoCount(this.storageTodo());

    new TodoInput({
      onAdd: (contents) => {
        // let todoItem = new TodoItem(contents);
        this.storage.setLocalStorage(contents);
        // this.todoItem.push(todoItem);
        console.log(this.storageTodo());
        this.setState(this.storageTodo());
      },
    });
  }

  storageTodo() {
    return this.storage.stringToJson().map((item) => {
      return new TodoItem(item);
    });
  }

  setState(updateItem) {
    console.log(updateItem);
    this.todoItem = updateItem;
    this.todoList.setState(this.todoItem);
    this.todoCount.setState(this.todoItem);
  }
}
