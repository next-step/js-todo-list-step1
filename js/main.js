import App from "./App.js";
import { data } from "./utils/constants.js";

new App({
  data,
  $targetTodoInput: document.querySelector(".new-todo"),
  $targetTodoList: document.querySelector(".todo-list"),
});
