import TodoApp from "./components/TodoApp.js";
import TodoInput from "./components/TodoInput.js";
import MainContainer from "./components/MainContainer.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import { getTodoItems, setTodoItems } from "./utils/localstorage.js";
import { findTodoItemIndex, getNextId } from "./utils/todoItem.js";

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

    const $todoInput = new TodoInput($app, this.addTodoItemHandler.bind(this));
    this.$todoInput = $todoInput;

    const $mainContainer = new MainContainer($app).$mainContainer;
    this.$main = $mainContainer;

    const $todoList = new TodoList(
      this.$main,
      this.$todoItems,
      this.destroyTodoHandler.bind(this)
    );
    this.$todoList = $todoList;

    const $todoCount = new TodoCount(this.$main, todoItems.length);
    this.$todoCount = $todoCount;
  }

  addTodoItemHandler(event) {
    const items = this.$todoItems;
    if (event.keyCode === 13) {
      const value = event.target.value;

      if (value === "") {
        return;
      }

      items.push({
        id: getNextId(items),
        content: value,
        achieved: false,
        addTodo: false,
      });

      event.target.value = "";
      setTodoItems(items);
      this.$todoList.setState(items);
      this.$todoCount.setState(items.length);
    }
  }

  destroyTodoHandler(event) {
    if (!event.target.classList.contains("destroy")) {
      return;
    }
    event.preventDefault();
    const id = event.target.dataset.id;
    console.log(this.$todoItems);
    const index = findTodoItemIndex(this.$todoItems, +id);

    this.$todoItems.splice(index, 1);
    this.$todoList.render();
    this.$todoCount.setState(this.$todoItems.length);
  }
}
