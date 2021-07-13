export default class LocalStorage {
  constructor(key) {
    this.key = key;
  }
  saveItems = (todoItems) => {
    localStorage.setItem(this.key, JSON.stringify(todoItems));
  };

  getItems = () => {
    const parsedData = localStorage.getItem(this.key);
    return parsedData && JSON.parse(parsedData);
  };
}
