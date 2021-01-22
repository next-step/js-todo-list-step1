export default function TodoInput(inputEl, todoApp) {
  this.focus = () => inputEl.focus();

  inputEl.addEventListener("keypress", (event) => {
    const value = inputEl.value.trimEnd();
    if (event.code === "Enter" && value) {
      inputEl.dispatchEvent(new CompositionEvent("compositionend"));
      todoApp.addItem(value);
      inputEl.value = "";
    }
  });
}
