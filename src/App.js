import { ToDoInput, ToDoList } from "./components";

const App = class {

  #toDoInput; #toDoList;

  constructor() {
    const toDoInputTarget = document.querySelector('#new-todo-title');
    const toDoListTarget = document.createElement('div');
    this.#toDoInput = new ToDoInput(toDoInputTarget);
    this.#toDoList = new ToDoList(toDoListTarget);
  }

}

const app = new App();