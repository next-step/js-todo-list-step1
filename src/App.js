import TodoApp from "./components/TodoApp.js";
import TodoInput from "./components/TodoInput.js";
import MainContainer from "./components/MainContainer.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import { getTodoItems, setTodoItems } from "./utils/localstorage.js";
import {
  findTodoItem,
  findTodoItemIndex,
  getNextId,
} from "./utils/todoItem.js";
import {
  ENTER,
  SELETED,
  VIEW_ALL,
  VIEW_COMPLETED,
  VIEW_REMAIN,
} from "./utils/constants.js";

export default class App {
  $app = null;
  $main = null;
  $todoApp = null;
  $todoInput = null;
  $todoList = null;
  $todoItems = null;
  $filterItems = null;

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
      this.destroyTodoHandler.bind(this),
      this.toggleTodoEvent.bind(this),
      VIEW_ALL
    );
    this.$todoList = $todoList;

    const $todoCount = new TodoCount(
      this.$main,
      todoItems.length,
      this.changeViewMode.bind(this)
    );
    this.$todoCount = $todoCount;
  }

  addTodoItemHandler(event) {
    const items = this.$todoItems;
    if (event.key === ENTER) {
      const value = event.target.value;

      if (value === "") {
        return;
      }

      const newItem = {
        id: getNextId(items),
        content: value,
        achieved: false,
        addTodo: false,
      };
      items.push(newItem);

      event.target.value = "";
      setTodoItems(items);

      if (this.$todoCount.$viewMode === VIEW_ALL) {
        this.$todoList.setState(items, VIEW_ALL);
        this.$todoCount.setState(items.length, VIEW_ALL);
        return;
      }

      if (this.$todoCount.$viewMode === VIEW_COMPLETED) {
        this.$todoList.setState(this.$filterItems, VIEW_COMPLETED);
        this.$todoCount.setState(this.$filterItems.length, VIEW_COMPLETED);
        return;
      }

      if (this.$todoCount.$viewMode === VIEW_REMAIN) {
        this.$filterItems.push(newItem);
        this.$todoList.setState(this.$filterItems, VIEW_REMAIN);
        this.$todoCount.setState(this.$filterItems.length, VIEW_REMAIN);
        return;
      }
    }
  }

  destroyTodoHandler(event) {
    if (!event.target.classList.contains("destroy")) {
      return;
    }
    event.preventDefault();
    const id = event.target.dataset.id;
    const index = findTodoItemIndex(this.$todoItems, +id);

    this.$todoItems.splice(index, 1);
    setTodoItems(this.$todoItems);

    if (this.$todoCount.$viewMode === VIEW_ALL) {
      this.$todoList.setState(this.$todoItems, VIEW_ALL);
      this.$todoCount.setState(this.$todoItems.length, VIEW_ALL);
      return;
    }

    if (this.$todoCount.$viewMode === VIEW_COMPLETED) {
      this.$filterItems = this.$todoItems.filter(
        (todoItem) => todoItem.achieved === true
      );
      this.$todoList.setState(this.$filterItems, VIEW_COMPLETED);
      this.$todoCount.setState(this.$filterItems.length, VIEW_COMPLETED);
      return;
    }

    if (this.$todoCount.$viewMode === VIEW_REMAIN) {
      this.$filterItems = this.$todoItems.filter(
        (todoItem) => todoItem.achieved === false
      );
      this.$todoList.setState(this.$filterItems, VIEW_REMAIN);
      this.$todoCount.setState(this.$filterItems.length, VIEW_REMAIN);
      return;
    }
  }

  changeViewMode(event) {
    const target = event.target;
    if (
      !(
        target.classList.contains(VIEW_ALL) ||
        target.classList.contains(VIEW_COMPLETED) ||
        target.classList.contains(VIEW_REMAIN)
      )
    ) {
      return;
    }

    if (target.classList.contains(VIEW_COMPLETED)) {
      this.$filterItems = this.$todoItems.filter(
        (todoItem) => todoItem.achieved === true
      );
      this.$todoList.setState(this.$filterItems, VIEW_COMPLETED);
      this.$todoCount.setState(this.$filterItems.length, VIEW_COMPLETED);
      return;
    }

    if (target.classList.contains(VIEW_REMAIN)) {
      this.$filterItems = this.$todoItems.filter(
        (todoItem) => todoItem.achieved === false
      );
      this.$todoList.setState(this.$filterItems, VIEW_REMAIN);
      this.$todoCount.setState(this.$filterItems.length, VIEW_REMAIN);
      return;
    }

    this.$todoList.setState(this.$todoItems, VIEW_ALL);
    this.$todoCount.setState(this.$todoItems.length, VIEW_ALL);
  }

  toggleTodoEvent(event) {
    if (!event.target.classList.contains("toggle")) {
      return;
    }
    event.preventDefault();

    const id = event.target.dataset.id;
    const item = findTodoItem(this.$todoItems, +id);

    item.achieved = !item.achieved;

    setTodoItems(this.$todoItems);

    if (this.$todoCount.$viewMode === VIEW_COMPLETED) {
      this.$filterItems = this.$todoItems.filter(
        (todoItem) => todoItem.achieved === true
      );
      this.$todoList.setState(this.$filterItems, VIEW_COMPLETED);
      this.$todoCount.setState(this.$filterItems.length, VIEW_COMPLETED);
      return;
    }

    if (this.$todoCount.$viewMode === VIEW_REMAIN) {
      this.$filterItems = this.$todoItems.filter(
        (todoItem) => todoItem.achieved === false
      );
      this.$todoList.setState(this.$filterItems, VIEW_REMAIN);
      this.$todoCount.setState(this.$filterItems.length, VIEW_REMAIN);
      return;
    }

    this.$todoList.setState(this.$todoItems, VIEW_ALL);
    this.$todoCount.setState(this.$todoItems.length, VIEW_ALL);
  }
}
