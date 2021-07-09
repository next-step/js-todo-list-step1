import { get, set } from "../storage/index.js";
const USER = "user";

export default class Store {
  constructor() {
    this.state = get(USER, { todos: [], view: "all" });
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  observing() {
    this.observers.forEach((observer) => observer.render());
  }
  //GET
  getState() {
    return this.state;
  }
  //SET
  setState(newState) {
    this.state = { ...this.state, ...newState };
    set(USER, this.state);
    this.observing();
  }
}
