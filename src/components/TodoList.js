import { buildNewState } from "../utils/helpers.js";
import { $ } from "../utils/selectors.js";

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
        const newState = buildNewState("TOGGLE", this.store, e);
        this.store.setState(newState);
      }
      if (isDestroy) {
        const newState = buildNewState("DELETE", this.store, e);
        this.store.setState(newState);
      }
    });
    this.$app.addEventListener("dblclick", (e) => {
      const isList = e.target.closest("li");
      if (isList) {
        isList.classList.add("editing");
      }
    });
    this.$app.addEventListener("keydown", (e) => {
      const isEditing = e.target.classList.contains("edit");
      
      if (isEditing && e.key === "Enter") {
        const newState = buildNewState("EDIT", this.store, e);
        this.store.setState(newState);
        e.target.closest("li").classList.remove("editing");
      }
      if (isEditing && e.key === "Escape") {
        const currentValue = $(".label").textContent;
        e.target.value = currentValue;
        e.target.closest("li").classList.remove("editing");
      }
    });
  }
  render() {
    const newState = this.store.getState();
    this.$app.innerHTML = newState.todos
      .map(({ id, content, status, edit }) => {
        const isChecked = status === "completed" ? "checked" : "false";
        return `<li dataset-id=${id} class="${status} ${edit}">
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
