import { ToDoInput, ToDoList } from "./components";

const App = class {

  #toDoInput; #toDoList;

  constructor() {
    const toDoInputTarget = document.querySelector('#new-todo-title');
    const toDoListTarget = document.querySelector('#todo-list');
    this.#toDoInput = new ToDoInput(toDoInputTarget, {
      addToDoItem: itemTitle => this.addToDoItem(itemTitle)
    });
    this.#toDoList = new ToDoList(toDoListTarget);
  }

  addToDoItem (itemTitle) {
    this.#toDoList.addItem(itemTitle);
  }


}

const app = new App();