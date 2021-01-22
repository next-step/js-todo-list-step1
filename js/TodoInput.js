export default function TodoInput(inputEl, todoApp) {
  this.addTodo = (value) => {
    inputEl.dispatchEvent(new CompositionEvent("compositionend"));
    todoApp.addTodo(value);
    inputEl.value = "";
  };

  this.focus = () => inputEl.focus();

  this.render = () => {
    if (!todoApp.editingId) {
      this.focus();
    }
  };

  inputEl.addEventListener("keypress", (event) => {
    const value = inputEl.value.trim();
    if (event.code === "Enter" && value) {
      this.addTodo(value);
    }
  });
}
