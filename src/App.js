import { ToDoInput, ToDoList, CountContainer } from "./components";

const App = class {

  #toDoInput; #toDoList; #countContainer;

  constructor() {
    const toDoInputTarget = document.querySelector('#new-todo-title');
    const toDoListTarget = document.querySelector('#todo-list');
    const countContainerTarget = document.querySelector('.count-container');
    this.#toDoInput = new ToDoInput(toDoInputTarget, {
      addToDoItem: itemTitle => this.#addToDoItem(itemTitle)
    });
    this.#toDoList = new ToDoList(toDoListTarget, {
      countUpdate: () => this.#countUpdate(),
    });
    this.#countContainer = new CountContainer(countContainerTarget, {
      getItemCount: () => this.#getItemCount(),
      selectToDoListType: type => this.#selectType(type),
    });
  }

  #addToDoItem (itemTitle) {
    this.#toDoList.addItem(itemTitle);
  }

  #countUpdate () {
    this.#countContainer.render();
  }

  #getItemCount () {
    return this.#toDoList.count();
  }

  #selectType () {

  }

}

const app = new App();