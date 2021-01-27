export default function TodoInput(inputEl, todoApp) {
  this.addTodo = (value) => {
    inputEl.dispatchEvent(new CompositionEvent("compositionend"));
    todoApp.addTodo(value);
    inputEl.value = "";
  };

  this.focusInput = () => inputEl.focus();

  this.render = () => {
    if (todoApp.editingId) {
      return;
    }

    this.focusInput();
  };

  inputEl.addEventListener("keypress", ({ code }) => {
    if (code !== "Enter") {
      return;
    }
    const value = inputEl.value.trim();
    value && this.addTodo(value);
  });
}
