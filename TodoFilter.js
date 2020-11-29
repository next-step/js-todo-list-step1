export default class TodoFilter {
  $target = null;
  constructor({ $target, onFilter }) {
    this.$target = $target.querySelector(".filters");
    window.addEventListener("hashchange", (e) => {
      const status = location.hash.slice(1);
      onFilter(status);
    });
    this.$target.addEventListener("click", (e) => {
      this.clearSelected();
      e.target.classList.add("selected");
    });
  }

  clearSelected() {
    const filterLink = this.$target.querySelectorAll("li a");
    filterLink.forEach((filterLink) => {
      filterLink.classList.remove("selected");
    });
  }
  addSelected(target) {}
}
