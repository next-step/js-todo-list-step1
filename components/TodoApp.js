import Item from "../models/Item.js";

export default class ToDoApp {
  items = [];
  entrustedComponents = [];

  constructor() {
    new TodoInput(this.onAdd.bind(this));
    this.entrustedComponents.push(new TodoList(this.onRemove.bind(this)));
  }

  notify() {
    this.entrustedComponents.forEach((component) =>
      component.render(this.items)
    );
  }

  setState(items) {
    this.items = items;
    console.log(this.items);
    this.notify();
  }

  onAdd(item) {
    const itemAddedState = [item, ...this.items];
    this.setState(itemAddedState);
  }

  onRemove(id) {
    console.log("remove");
    const targetDeletedState = this.items.filter((item) => item.id !== id);
    this.setState(targetDeletedState);
  }
}

class TodoInput {
  $todoInput;
  onAdd;
  idCounter = 0;

  constructor(onAdd) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.onAdd = onAdd;
    this.$todoInput.addEventListener("keypress", this.onKeypress.bind(this));
  }

  genTodoItemId() {
    return `_${this.idCounter++}`;
  }

  onKeypress(event) {
    if (event.key === KEYS.ENTER) {
      this.onAdd(new Item(this.genTodoItemId(), event.target.value, false));
    }
  }
}

class TodoList {
  $todoList;
  onRemove;

  constructor(onRemove) {
    this.$todoList = document.querySelector("#todo-list");
    this.onRemove = onRemove;
  }

  render(items) {
    this.$todoList.innerHTML = [];
    items.map((item) =>
      this.$todoList.appendChild(new TodoItem(item, this.onRemove).render())
    );
  }
}

class TodoItem {
  item;
  onRemove;

  constructor(item, onRemove) {
    this.item = item;
    this.onRemove = onRemove;
  }

  makeTemplate(title) {
    const $li = document.createElement("li");

    $li.innerHTML = `
           <div class="view">
              <input class="toggle" type="checkbox"/>
              <label class="label">${title}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${title}" />
        `;

    const $destroyBtn = $li.querySelector(".destroy");

    $destroyBtn.addEventListener("click", this.onDeleteButtonClick.bind(this));

    return $li;
  }

  onDeleteButtonClick() {
    this.onRemove(this.item.id);
  }

  render() {
    return this.makeTemplate(this.item.title);
  }
}

const KEYS = {
  ENTER: "Enter",
};
