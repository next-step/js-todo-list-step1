export default function TodoInput(inputEl, todoApp) {
  this.addTodo = (value) => {
    inputEl.dispatchEvent(new CompositionEvent("compositionend"));
    todoApp.addTodo(value);
    inputEl.value = "";
  };

  this.render = () => {
    if (!todoApp.editingId) {
      inputEl.focus();
    }
  };

  inputEl.addEventListener("keypress", ({ code }) => {
    if (code === "Enter") {
      return;
    }
    const value = inputEl.value.trim();
    value && this.addTodo(value);
  });
}
