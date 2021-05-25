export default class MainContainer {
  $target = null;
  $mainContainer = null;

  constructor($target) {
    this.$target = $target;
    const MainContainer = document.createElement("main");
    this.$mainContainer = MainContainer;

    this.$mainContainer.id = "Main";

    this.$target.appendChild(this.$mainContainer);
    this.render();
  }

  render() {
    this.$mainContainer.innerHTML = `<input class="toggle-all" type="checkbox" />`;
  }
}
