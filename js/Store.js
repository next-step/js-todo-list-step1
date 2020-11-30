export class Store {
  constructor() {
    this.store = new Map();
  }

  addStore = (item) => {
    this.store.set(item.id, { state: item.state, contents: item.contents });
    return this;
  };
  getStoreItem = (key) => {
    return this.store.get(key);
  };
}
