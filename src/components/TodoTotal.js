import { filterTodos } from "../utils/helpers.js";

export default class TodoTotal {
  constructor(store, $app) {
    this.store = store;
    this.$app = $app;
  }
  render() {
    const { view, todos } = this.store.getState();
    //prettier-ignore
    const curViewTodos = view === "all" ? todos 
                                        : filterTodos(todos, view);
    this.$app.innerHTML = `총 <strong>${curViewTodos.length}</strong> 개</span>`;
  }
}
