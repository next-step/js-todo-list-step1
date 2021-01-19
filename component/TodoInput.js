export class TodoInput {
  constructor({ onAdd }) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoInput.addEventListener("keypress", (e) => this.saveTodos(e));
    this.onAdd = onAdd;
  }

  saveTodos({ target, key }) {
    if (key === "Enter") {
      this.onAdd({
        id: Math.floor(Math.random() * 100),
        contents: target.value,
        state: "active",
      });
      target.value = "";
    }
  }
}
