import { createLocalStorageObject } from "../js/LocalStorageUtil.js";
// import { renderTodoItem, checkedTodos, deleteTodos } from "./TodoItem.js";

// const todoList = () => {
//   const items = createLocalStorageObject();
//   createLocalStorageObject();
//   console.log(items);
//   const $todoList = document.querySelector("#todo-list");

//   items.forEach((item) => {
//     $todoList.insertAdjacentHTML("beforeend", renderTodoItem(item));
//   });
//   checkedTodos();
//   // deleteTodos();
// };

export class TodoList {
  constructor() {
    this.$todoList = document.querySelector("#todo-list");
    // this.todoItem = todoItem;
  }

  setState = (updateItems) => {
    console.log("TodoList state: ", updateItems);
    this.render(updateItems);
  };

  render = (todoItems) => {
    const copyItems = [...todoItems];
    Object.values(copyItems).forEach((item) => {
      this.$todoList.insertAdjacentHTML("beforeend", item.content);
    });
  };
}
