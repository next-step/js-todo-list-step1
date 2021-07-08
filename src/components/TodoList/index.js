//prettier-ignore
import { buildListTodos, addsEventListener } from "./helper.js";
import { COMPLETED, CHECKED, FALSE } from "./constant.js";

export default class TodoList {
  constructor(store, $app) {
    this.store = store;
    this.$app = $app;
    this.mount();
  }
  mount() {
    addsEventListener(this.$app, this.store);
  }
  render() {
    this.$app.innerHTML = buildListTodos(this.store)
      .map(({ id, content, status, edit }) => {
        const isChecked = status === COMPLETED ? CHECKED : FALSE;
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
