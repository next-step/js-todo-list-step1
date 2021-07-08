import { buildNewState } from "../utils/helpers.js";

export default class TodoList {
  constructor(store, $app) {
    this.store = store;
    this.$app = $app;
    this.mount();
  }
  mount() {
    this.$app.addEventListener("click", (e) => {
      const isToggle = e.target.classList.contains("toggle");
      const isDestroy = e.target.classList.contains("destroy");
      if (isToggle) {
        const newState = buildNewState("ADD", this.store, e);
        this.store.setState(newState);
      }
      if (isDestroy) {
        const newState = buildNewState("DELETE", this.store, e);
        this.store.setState(newState);
      }
    });
  }
  render() {
    const newState = this.store.getState();
    this.$app.innerHTML = newState.todos
      .map(({ id, content, status }) => {
        const isChecked = status === "completed" ? "checked" : "false";
        return `<li dataset-id=${id} class=${status}>
                  <div class="view">
                    <input class="toggle" type="checkbox" ${isChecked}>
                    <label class="label">${content}</label>
                    <button class="destroy" ></button>
                  </div>
                  <input class="edit" value="${content}">
                </li>`;
      })
      .join("");
  }
}
