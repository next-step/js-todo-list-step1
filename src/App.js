import { ToDoInput } from "./components";

const App = class {

  #todoInput;

  constructor() {
    this.#toDoInput = new ToDoInput();
  }

}

const app = new App();