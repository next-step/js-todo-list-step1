export default class TodoRegister {
  constructor({ el, onRegister }) {
    this.el = el;
    this.onRegister = onRegister;
    this.initialize();
  }

  register() {
    if (!this.el.value) return;
    const value = this.el.value;
    this.el.value = "";
    this.onRegister(value);
  }

  initialize() {
    this.el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.register();
    });
  }
}
