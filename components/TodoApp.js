import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import Item from "../models/Item.js";

export default class ToDoApp {
  items = [];

  /* items의 상태가 변했을때 변경을 전달받을 컴포넌트(들) */
  entrustedComponents = [];

  constructor() {
    new TodoInput(this.onAdd.bind(this));
    this.entrustedComponents.push(
      new TodoList(this.onRemove.bind(this), this.onCheckedToggle.bind(this))
    );
  }

  notify() {
    this.entrustedComponents.forEach((component) =>
      component.render(this.items)
    );
  }

  setState(items) {
    this.items = items;
    this.notify();
  }

  onAdd(item) {
    const itemAddedState = [item, ...this.items];
    this.setState(itemAddedState);
  }

  onRemove(targetId) {
    const targetDeletedState = this.items.filter(
      (item) => item.id !== targetId
    );
    this.setState(targetDeletedState);
  }

  onCheckedToggle(targetId) {
    const sliced = [...this.items];
    const targetIndex = sliced.findIndex(({ id }) => id === targetId);
    console.log(sliced, targetIndex);
    const { id, title, isCompleted } = sliced[targetIndex];

    console.log(id, title);
    const newItem = new Item(id, title, !isCompleted);
    sliced[targetIndex] = newItem;

    console.log("check");
    this.setState(sliced);
  }
}
