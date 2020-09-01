import { ToDoInput, ToDoList } from "./components";

const App = class {

  #toDoInput; #toDoList; #countContainer;

  constructor() {
    const toDoInputTarget = document.querySelector('#new-todo-title');
    const toDoListTarget = document.querySelector('#todo-list');
    const countContainerTarget = document.querySelector('.count-container');
    this.#countContainer = {
      target: countContainerTarget,
      countText: countContainerTarget.querySelector('.todo-count strong'),
      buttons: countContainerTarget.querySelector('.filters a'),
      allButton: countContainerTarget.querySelector('.all'),
      activeButton: countContainerTarget.querySelector('.active'),
      completedButton: countContainerTarget.querySelector('.completed'),
    };
    this.#toDoInput = new ToDoInput(toDoInputTarget, {
      addToDoItem: itemTitle => this.#addToDoItem(itemTitle)
    });
    this.#toDoList = new ToDoList(toDoListTarget, {
      emitItems: items => this.#resetStatus(items)
    });
  }

  #addToDoItem (itemTitle) {
    this.#toDoList.addItem(itemTitle);
  }

  #resetStatus (items) {
    this.#countContainer.countText.innerHTML = items.length;
  }

}

const app = new App();