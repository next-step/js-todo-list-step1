import { TodoList } from "./TodoList.js";
import { LocalStorageUtil } from "../js/LocalStorageUtil.js";

export class TodoFilter {
  constructor(todo) {
    this.$filter = document.querySelector(".filters");
    this.$filter.addEventListener("click", this.onClickFilter);
    this.todoList = new TodoList(new LocalStorageUtil().storageTodo());
  }

  setState(updateItems) {
    const todoItems = updateItems;
    this.todoList.setState(todoItems);
  }

  onClickFilter(e) {
    e.preventDefault();
    const state = e.target.getAttribute("href").replace(/\#/g,'');
    let todoItems = new LocalStorageUtil().storageTodo();

    switch (state){
      case 'active':
        todoItems = todoItems.filter(item => item.state === "active");
        new TodoList().setState(todoItems);
        break;
      case 'completed':
        todoItems = todoItems.filter(item => item.state === "completed");
        new TodoList().setState(todoItems);
        break;
      default:
        new TodoList().setState(todoItems);
    }
  }

}
