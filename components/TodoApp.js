import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";

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
