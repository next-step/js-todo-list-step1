import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCountContainer from "./TodoCountContainer.js";
import { generateId } from "./utils.js";

export default function TodoApp(appEl, items) {
  const inputEl = appEl.querySelector("#new-todo-title");
  const listEl = appEl.querySelector("#todo-list");
  const countContainerEl = appEl.querySelector(".count-container");

  this.items = items;
  this.filter = null;
  this.editingId = null;

  this.todoInput = new TodoInput(inputEl, this);
  this.todoList = new TodoList(listEl, this);
  this.todoCountContainer = new TodoCountContainer(countContainerEl, this);

  this.setItems = (items) => {
    this.items = items;
    this.render();
  };

  this.getItem = (targetId) => this.items.find(({ id }) => id === targetId);

  this.addItem = (value) =>
    this.setItems([
      { id: generateId(), value, completed: this.filter ?? false },
      ...this.items,
    ]);

  this.updateItem = (item) =>
    this.setItems(
      this.items.map((_item) => (_item.id !== item.id ? _item : item))
    );

  this.deleteItem = (targetId) =>
    this.setItems(this.items.filter(({ id }) => id !== targetId));

  this.setFilter = (filter = null) => {
    this.filter = filter;
    this.render();
  };

  this.setEditingId = (id = null) => {
    this.editingId = id;
    this.render();
  };

  this.render = () => {
    const filtered = this.items.filter(
      ({ completed }) => this.filter === null || completed === this.filter
    );

    this.todoInput.render();
    this.todoList.render(filtered);
    this.todoCountContainer.render(filtered);
  };
}
