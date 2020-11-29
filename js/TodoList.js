import TodoRegister from "./TodoRegister.js";
import TodoItem from "./TodoItem.js";
import TodoFilter from "./TodoFilter.js";
import { setStorage, getStorage } from "./useStorage.js";

export default class TodoList {
  static initialState = {
    items: [],
    filter: null,
  };

  constructor({ el, counterEl, registerEl, filters }) {
    this.el = el;
    this.counterEl = counterEl;
    this.items = TodoList.initialState.items;
    this.filter = TodoList.initialState.filter;

    new TodoRegister({
      el: registerEl,
      onRegister: (text) => this.addItem(text),
    });

    this.filters = filters.map(
      (filter, index) =>
        new TodoFilter({
          el: filter.el,
          key: filter.key,
          value: filter.value,
          selected: index === 0,
          onFilter: () => this.filterItems(filter.key, filter.value),
        })
    );

    this.loadStorage();
  }

  set state(newState) {
    for (const state in newState) {
      this[state] = newState[state];
    }
    setStorage("@todo/items", this.items);
    this.render();
  }

  setState(newState) {
    this.state = newState;
  }

  loadStorage() {
    const storedItems = getStorage("@todo/items");
    this.setState({ items: storedItems || [] });
  }

  addItem(text) {
    this.setState({
      items: [
        ...this.items,
        {
          id: new Date().getTime(),
          text,
          completed: false,
        },
      ],
    });
  }

  removeItem(id) {
    this.setState({
      items: this.items.filter((item) => item.id !== id),
    });
  }

  updateItem(updatedItem) {
    this.setState({
      items: this.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    });
  }

  filterItems(key, value) {
    this.filters.map((filter) => {
      filter.selected = filter.key === key && filter.value === value;
    });
    this.setState({ filter: key ? { [key]: value } : null });
  }

  render() {
    this.el.innerHTML = "";
    let itemsForRender = this.items;

    for (const key in this.filter) {
      itemsForRender = itemsForRender.filter(
        (item) => item[key] === this.filter[key]
      );
    }

    itemsForRender.map((item) => {
      this.el.append(
        new TodoItem({
          ...item,
          onRemove: (id) => this.removeItem(id),
          onUpdate: (item) => this.updateItem(item),
        }).render()
      );
    });

    this.counterEl.innerHTML = itemsForRender.length;
  }
}
