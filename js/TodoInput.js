export default function TodoInput(inputEl, todoApp) {
  inputEl.addEventListener("keypress", (event) => {
    const value = inputEl.value.trimEnd();
    if (event.code === "Enter" && value) {
      inputEl.dispatchEvent(new CompositionEvent("compositionend"));
      todoApp.addItem(value);
      inputEl.value = "";
    }
  });
}
