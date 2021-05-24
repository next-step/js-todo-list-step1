import TodoApp from "./components/TodoApp.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import { TODO_LISTS } from "./utils/constants.js";
import { getTodoItems } from "./utils/localstorage.js";

export default class App {
  $app = null;
  $main = null;
  $todoApp = null;
  $todoInput = null;
  $todoList = null;
  $todoItems = null;

  constructor($app, $main) {
    this.$app = $app;
    this.$main = $main;

    const todoItems = getTodoItems();
    this.$todoItems = todoItems;

    const $todoApp = new TodoApp($app);
    this.$todoApp = $todoApp;

    const $todoInput = new TodoInput($app);
    this.$todoInput = $todoInput;

    const $todoList = new TodoList($main);
    this.$todoList = $todoList;

    const $todoCount = new TodoCount($main, todoItems.length);
    this.$todoCount = $todoCount;
  }
}
