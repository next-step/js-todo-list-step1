export class LocalStorageUtil {
  constructor() {
    this.localStorage = localStorage;
    this.localStorageArray = [];
  }

  setLocalStorage = (todoItem) => {
    this.localStorage.setItem(todoItem.id, JSON.stringify(todoItem));
  };

  createLocalStorageObject = () => {};

  stringToJson() {
    // let obj = [];
    Object.values(this.localStorage).forEach((item) => {
      this.localStorageArray.push(JSON.parse(item));
    });
    return this.localStorageArray;
  }

  getLocalStoage = (todoItem) => {
    const obj = { id: "", state: false, text: "" };
    obj = { ...JSON.parse(this.localStorage.getItem(todoItem.id)) };
    console.log(obj);
    return obj;
  };

  getLocalStoageArray() {
    return this.localStorageArray;
  }
}
