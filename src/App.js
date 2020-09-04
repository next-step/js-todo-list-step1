import { ToDoInput, ToDoList, ToDoCount, ToDoFilter } from "./components/index.js";
import { toDoStore } from "./store/toDoStore.js";

const App = class {

  constructor() {
    const toDoInputTarget = document.querySelector('#new-todo-title');
    const toDoListTarget = document.querySelector('#todo-list');
    const countTarget = document.querySelector('.todo-count');
    const filterTarget = document.querySelector('.filters');

    toDoStore.addObserver(
      new ToDoInput(toDoInputTarget),
      new ToDoList(toDoListTarget),
      new ToDoCount(countTarget),
      new ToDoFilter(filterTarget),
    );
  }

}

new App();