import TodoApp from "./components/TodoApp.js";

export default class App {
  $target = null;
  $todoApp = null;

  constructor($target) {
    this.$target = $target;

    const $todoApp = new TodoApp($target);
    this.$todoApp = $todoApp;
  }
}
