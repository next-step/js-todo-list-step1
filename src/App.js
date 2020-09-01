import { ToDoInput, ToDoList } from "./components";

const App = class {

  #toDoInput; #toDoList;

  constructor() {
    this.#toDoInput = new ToDoInput();
    this.#toDoList = new ToDoList();
  }

}

const app = new App();