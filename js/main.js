import App from "./App.js";
import { exData } from "./utils/constants.js";

const myStorageData = JSON.parse(localStorage.getItem('myTodo'))
const data = (myStorageData || exData)
new App({
  data,
  $targetTodoInput: document.querySelector(".new-todo"),
  $targetTodoList: document.querySelector(".todo-list"),
  $targetTodoCount: document.querySelector(".todo-count"),
  $targetTodoFilters: document.querySelector(".filters"),
});
