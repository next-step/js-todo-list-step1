import TodoApp from "./components/TodoApp.js";
import TodoInput from "./components/TodoInput.js";

export default class App {
  $target = null;
  $todoApp = null;
  $todoInput = null;
  constructor($target) {
    this.$target = $target;

    const $todoApp = new TodoApp($target);
    this.$todoApp = $todoApp;

    const $todoInput = new TodoInput($target);
    this.$todoInput = $todoInput;
  }
}
