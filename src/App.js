import { $ } from "./utils/utils.js";

// components
import TodoInput from "./components/TodoInput.js";

class App {
  constructor(todoInput) {
    this.todoListState = [];
    this.todoInput = new TodoInput(this.todoListState, todoInput);
  }
}

function handleLoadAfter() {
  new App($("#new-todo-title"));
}

window.addEventListener("load", handleLoadAfter);
