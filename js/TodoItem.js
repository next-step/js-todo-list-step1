export default class TodoItem {
  static initialState = {
    text: "",
    completed: false,
    editable: false,
  };

  constructor({ id, text, completed, onRemove, onUpdate }) {
    this.el = document.createElement("fragment");
    this.id = id;
    this.text = text;
    this.completed = completed || TodoItem.initialState.completed;
    this.editable = TodoItem.initialState.editable;
    this.onRemove = onRemove;
    this.onUpdate = onUpdate;
    this.initialize();
  }

  set state(newState) {
    for (const state in newState) {
      this[state] = newState[state];
    }
    this.render();
  }

  setState(newState) {
    this.state = newState;
  }

  toggle() {
    this.setState({ completed: !this.completed });
    this.onUpdate(this);
  }

  remove() {
    this.onRemove(this.id);
  }

  startEdit() {
    this.setState({ editable: true });
    const input = this.el.querySelector(".edit");
    input.focus();
  }

  cancelEdit() {
    this.setState({ editable: false });
  }

  saveEdit(e) {
    this.setState({ text: e.target.value, editable: false });
    this.onUpdate(this);
  }

  initialize() {
    this.el.addEventListener("click", (e) => {
      if (e.target.className.includes("toggle")) this.toggle();
      if (e.target.className.includes("destroy")) this.remove();
    });
    this.el.addEventListener("dblclick", () => this.startEdit());
    this.el.addEventListener("keydown", (e) => {
      if (!e.target.className.includes("edit")) return;
      if (e.key === "Enter") this.saveEdit(e);
      if (e.key === "Escape") this.cancelEdit();
    });
    window.addEventListener("click", (e) => {
      if (!this.el.contains(e.target)) this.cancelEdit();
    });
  }

  render() {
    this.el.innerHTML = `<li class="${this.completed ? "completed" : ""} ${
      this.editable ? "editing" : ""
    }">
      <div class="view">
        <input class="toggle" type="checkbox" ${
          this.completed ? "checked" : ""
        } />
        <label class="label">${this.text}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${this.text}" />
    </li>`;
    return this.el;
  }
}
