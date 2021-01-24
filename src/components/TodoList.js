import Component from "../core/Component.js";
export default class TodoList extends Component {
  template() {
    const { filteredList } = this.$props;
    return `
    ${filteredList
      .map(
        (todo) => `
        <li class="${todo.state} ${todo.edit}" data-seq="${todo.seq}">
            <div class="view" >
                <input class="toggle" type="checkbox" ${
                  todo.state === "completed" ? "checked" : ""
                } />
                <label class="label">${todo.contents}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.contents}" />
        </li>
    `
      )
      .join("")}
        `;
  }

  setEvent() {
    const { toggleTodo, deleteTodo, onEditingMode, editTodo } = this.$props;

    this.addEvent("click", ".toggle", ({ target }) => {
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      toggleTodo(seq);
    });
    this.addEvent("click", ".destroy", ({ target }) => {
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      deleteTodo(seq);
    });
    this.addEvent("dblclick", ".label", ({ target }) => {
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      onEditingMode(seq);
    });
    this.addEvent("keyup", ".edit", ({ key, target }) => {
      if (key === "Enter") {
        const seq = Number(target.closest("[data-seq]").dataset.seq);
        editTodo(seq, target.value);
      } else if (key === "Escape") {
        const seq = Number(target.closest("[data-seq]").dataset.seq);
        onEditingMode(seq);
      } else {
        return;
      }
    });
  }
}
