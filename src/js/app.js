import { TodoHeader } from "./components/todoHeader.js";

class App {
  constructor($target) {
    this.$target = $target;
    this.header = new TodoHeader(this.$target, "TODOS");
    this.render();
  }
  setState() {}
  render() {
    this.header.render();
  }
}

new App(document.querySelector(".todoapp"));
