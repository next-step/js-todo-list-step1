export default class CountContainer {
  $todoCount;

  constructor() {
    this.$todoCount = document
      .querySelector(".count-container")
      .querySelector(".todo-count")
      .querySelector("strong");
  }

  render(items) {
    this.$todoCount.innerText = items.length;
  }
}
