import { $ } from "../utils/selectors.js";

export default class TodoList {
  constructor(store, $app) {
    this.store = store;
    this.$app = $app;
    this.render();
    this.mount();
  }
  mount() {
  }
  render() {
    const newState = this.store.getState();
    this.$app.innerHTML = newState.todos
      .map(({ id, content, status }) => {
        return `<li class=${status}>
                  <div class="view">
                    <input dataset-id=${id} type="checkbox" class="toggle">
                    <label class="label">${content}</label>
                    <button class="destory"></button>
                  </div>
                  <input class="edit" value="${content}">
                </li>`;
      })
      .join("");
  }
}
