import TodoRegister from "./TodoRegister.js";
import TodoItem from "./TodoItem.js";
import TodoFilter from "./TodoFilter.js";

export default class TodoList {
  static initialState = {
    items: [],
    filter: null,
  };

  constructor({ el, counterEl, registerEl, filters }) {
    this.el = el;
    this.counterEl = counterEl;

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

    // states
    this.items = TodoList.initialState.items;
    this.filter = TodoList.initialState.filter;
  }

  set state(newState) {
    for (const state in newState) {
      this[state] = newState[state];
    }
    this.render();
  }

  setState(newState) {
    this.state = newState;
  }

  addItem(text) {
    this.setState({
      items: [
        ...this.items,
        new TodoItem({
          text,
          onRemove: (id) => this.removeItem(id),
          onUpdate: (item) => this.updateItem(item),
        }),
      ],
    });
  }

  removeItem(id) {
    this.setState({
      items: this.items.filter((item) => item.id !== id),
    });
  }

  updateItem(newItem) {
    this.setState({
      items: this.items.map((item) =>
        item.id === newItem.id ? newItem : item
      ),
    });
  }

  filterItems(key, value) {
    this.filters.map((filter) => {
      filter.selected = filter.key === key && filter.value === value;
    });
    if (!key) {
      this.setState({ filter: null });
      return;
    }
    this.setState({
      filter: { [key]: value },
    });
  }

  render() {
    this.el.innerHTML = "";
    let itemsForRender = this.items;
    for (const key in this.filter) {
      itemsForRender = itemsForRender.filter(
        (item) => item[key] === this.filter[key]
      );
    }
    itemsForRender.map((item) => this.el.append(item.render()));
    this.counterEl.innerHTML = itemsForRender.length;
  }
}
