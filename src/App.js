import { ToDoInput, ToDoList, CountContainer } from "./components/index.js";
import { toDoStore } from "./store/index.js";

const App = class {

  #toDoInput; #toDoList; #countContainer;

  constructor() {
    const toDoInputTarget = document.querySelector('#new-todo-title');
    const toDoListTarget = document.querySelector('#todo-list');
    const countContainerTarget = document.querySelector('.count-container');

    this.#toDoInput = new ToDoInput(toDoInputTarget);
    this.#toDoList = new ToDoList(toDoListTarget);
    this.#countContainer = new CountContainer(countContainerTarget);

    toDoStore.addObserver(
      this.#toDoInput,
      this.#toDoList,
      this.#countContainer
    );
  }

}

new App();