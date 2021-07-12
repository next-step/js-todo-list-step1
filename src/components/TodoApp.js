export default class TodoApp {
  $target = null;
  $todoApp = null;

  constructor($target) {
    this.$target = $target;
    const TodoApp = document.createElement("h1");
    this.$todoApp = TodoApp;
    this.$todoApp.innerText = "TODO";
    this.render();
  }

  render() {
    this.$target.appendChild(this.$todoApp);
  }
}
