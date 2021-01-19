export default class TodoFilter {
  constructor({ el, selected, key, value, onFilter }) {
    this.el = el;
    this.key = key;
    this.value = value;
    this.onFilter = onFilter;
    this.selected = selected;
    this.initialize();
  }

  set selected(selected) {
    this.el.classList.toggle("selected", selected);
  }

  initialize() {
    this.el.addEventListener("click", (e) => {
      e.preventDefault();
      this.el.classList.add("selected");
      this.onFilter();
    });
  }
}
