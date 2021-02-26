import Item from "../models/Item.js";

export default class ToDoApp {
  todoItems = [];

  constructor() {
    new TodoInput(this.onAdd.bind(this));
  }

  setState(todoItems) {
    this.todoItems = todoItems;
  }

  onAdd(item) {
    const newState = [item, ...this.todoItems];
    this.setState(newState);
    console.log(this.todoItems);
  }

  onRemove() {}
}

class TodoInput {
  $todoInput;
  onAdd;

  constructor(onAdd) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.onAdd = onAdd;

    this.init();
  }

  init() {
    this.$todoInput.addEventListener("keypress", this.onKeypress.bind(this));
  }

  onKeypress(event) {
    if (event.key === KEYS.ENTER) {
      this.onAdd(new Item(event.target.value, false));
    }
  }
}

class TodoList {}

class TodoItem {}

const KEYS = {
  ENTER: "Enter",
};
