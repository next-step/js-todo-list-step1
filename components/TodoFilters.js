import { LAYERS } from "../utils/constants.js";

export default class TodoFilters {
  $filters;
  onLayerChange;

  constructor(onLayerChange, layer) {
    this.onLayerChange = onLayerChange;
    this.$filters = document.querySelector(".filters");
    this.addEventListeners();
    this.setDefaultOutlineOfATags(this.getATags(), layer);
  }

  addEventListeners() {
    const [$all, $todo, $completed] = this.getATags();

    this.$filters.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        const $a = event.target;

        [$all, $todo, $completed].forEach(($elem) =>
          $a === $elem
            ? $elem.classList.add("selected")
            : $elem.classList.remove("selected")
        );

        switch ($a) {
          case $all:
            this.onLayerChange(LAYERS.ALL);
            break;
          case $todo:
            this.onLayerChange(LAYERS.TODO);
            break;
          case $completed:
            this.onLayerChange(LAYERS.COMPLETED);
            break;
        }
      }
    });
  }

  getATags() {
    return [...this.$filters.querySelectorAll("a")];
  }

  setDefaultOutlineOfATags([$all, $todo, $completed], layer) {
    [$all, $todo, $completed].forEach(($elem) => {
      $elem.classList[0] === layer
        ? $elem.classList.add("selected")
        : $elem.classList.remove("selected");
    });
  }
}
