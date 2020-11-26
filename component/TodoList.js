import { createLocalStorageObject } from "../js/LocalStorageUtil.js";
import { renderTodoItem, checkedTodos, deleteTodos } from "./TodoItem.js";

const todoList = () => {
  const items = createLocalStorageObject();
  createLocalStorageObject();
  console.log(items);
  const todoList = document.querySelector("#todo-list");

  items.forEach((item) => {
    todoList.insertAdjacentHTML("beforeend", renderTodoItem(item));
  });
  checkedTodos();
  deleteTodos();
};

export { todoList };
