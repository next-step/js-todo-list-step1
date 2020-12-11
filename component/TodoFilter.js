import { TodoList } from "./TodoList.js";
import { LocalStorageUtil } from "../js/LocalStorageUtil.js";

export class TodoFilter {
  constructor(todo) {
    this.$filter = document.querySelector(".filters");
    this.$filter.addEventListener("click", this.onClickFilter);
    this.todoList = new TodoList(new LocalStorageUtil().storageTodo());
    console.log(this.todoList);
  }

  setState(updateItems) {
    const todoItems = updateItems;
    this.todoList.setState(todoItems);
    this.render(this.todoList);
  }

  render(item) {
    console.log("render item :", item);
  }

  onClickFilter(e) {
    const state = e.target.getAttribute("href");
    const test = new LocalStorageUtil().storageTodo();
  }
}
