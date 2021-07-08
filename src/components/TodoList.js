import { buildNewTodo } from "../utils/helpers.js";

export default class TodoList {
  constructor(store, $app) {
    this.store = store;
    this.$app = $app;
    this.render();
    this.mount();
  }
  mount() {
    this.$app.addEventListener("click", (e) => {
      const isToggle = e.target.classList.contains("toggle");
      if (isToggle) {
        const newState = buildNewTodo(this.store, e);
        this.store.setState(newState);
      }
    });
  }
  render() {
    const newState = this.store.getState();
    this.$app.innerHTML = newState.todos
      .map(({ id, content, status }) => {
        const isChecked = status === "completed" ? "checked" : "false";
        return `<li class=${status}>
                  <div class="view">
                    <input class="toggle" dataset-id=${id} type="checkbox" ${isChecked}>
                    <label class="label">${content}</label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${content}">
                </li>`;
      })
      .join("");
  }
}
