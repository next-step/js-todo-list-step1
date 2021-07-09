//prettier-ignore
import { buildListTodos, editSelectedTodo, toggleTodoItem, deleteTodoItem, setEditingMode } from "./helper.js";
import { COMPLETED, CHECKED, FALSE } from "./constant.js";

export default class TodoList {
  constructor(store, $app) {
    this.store = store;
    this.$app = $app;
    this.mount();
    this.render();
  }
  mount() {
    //prettier-ignore
    this.$app.addEventListener("keydown", (e) => editSelectedTodo(e, this.store));
    this.$app.addEventListener("dblclick", (e) => setEditingMode(e));
    this.$app.addEventListener("click", (e) => toggleTodoItem(e, this.store));
    this.$app.addEventListener("click", (e) => deleteTodoItem(e, this.store));
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
