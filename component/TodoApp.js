import { todoList } from "./TodoList.js";
import { renderTodoItem } from "./TodoItem.js";
import { makeLocalStorageObject } from "../js/makeLocalStorageObject.js";
import { setLocalStorage } from "../js/LocalStorageUtil.js";

let id_No = localStorage.length;
let storageObject = new makeLocalStorageObject();

const saveTodos = () => {
  const todos = document.querySelector("#new-todo-title");

  todos.addEventListener("keypress", $onAddTodoHandle);
};

const $onAddTodoHandle = (event) => {
  const todos = document.querySelector("#new-todo-title");

  if (event.keyCode === 13) {
    storageObject.setId(id_No);
    storageObject.setValue(todos.value);
    addTodos(storageObject);
    setLocalStorage(storageObject);
    id_No++;
  }
};

const addTodos = (param) => {
  console.log(param);
  const todoList = document.querySelector("#todo-list");
  todoList.insertAdjacentHTML("beforeend", renderTodoItem(param));
};

window.onload = () => {
  //   localStorage.clear();
  todoList();
  saveTodos();
};
