import { LAYERS } from "../utils/constants.js";

export default class TodoFilters {
  $filters;
  onLayerChange;

  constructor(onLayerChange) {
    this.onLayerChange = onLayerChange;
    this.$filters = document.querySelector(".filters");
    this.delegateEvent();
  }

  delegateEvent() {
    const [$all, $todo, $completed] = this.$filters.querySelectorAll("a");

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
}
