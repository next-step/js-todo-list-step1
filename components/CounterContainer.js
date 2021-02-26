export default class CountContainer {
  $countContainer;
  $todoCount;

  constructor() {
    this.$countContainer = document.querySelector(".count-container");
    this.$todoCount = this.$countContainer
      .querySelector(".todo-count")
      .querySelector("strong");
  }

  render(items) {
    this.$todoCount.innerText = items.length;
  }
}
