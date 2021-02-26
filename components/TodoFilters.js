import { LAYERS } from "../utils/constants.js";

export default class TodoFilters {
  $filters;
  onLayerChange;

  constructor(onLayerChange) {
    this.onLayerChange = onLayerChange;

    this.$filters = document.querySelector(".filters");

    const [$all, $todo, $completed] = this.$filters.querySelectorAll("a");

    this.$filters.querySelectorAll("li").forEach(($li) => {
      $li.addEventListener("click", (event) => {
        const $a = $li.querySelector("a");
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
      });
    });
  }
}
