export default function TodoInput(inputEl, todoApp) {
  this.focusInput = () => inputEl.focus();

  this.addTodo = ({ code }) => {
    if (code !== "Enter") {
      return;
    }

    const value = inputEl.value.trim();
    if (!value) {
      return;
    }

    inputEl.dispatchEvent(new CompositionEvent("compositionend"));
    todoApp.addTodo(value);
    inputEl.value = "";
  };

  this.render = () => {
    if (todoApp.editingId) {
      return;
    }

    this.focusInput();
  };

  inputEl.addEventListener("keypress", this.addTodo);
}
