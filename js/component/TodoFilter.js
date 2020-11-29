import { FILTER, EVENT } from "../utils/constants.js";
import $store from "../store/index.js";

export default function TodoFilter(render) {
  const $filter = document.querySelector(".filters");

  const toggleFilterSelected = (target) => {
    const selected = $filter.querySelector(".selected");
    selected.classList.remove("selected");
    target.classList.add("selected");
  };

  const filterTodo = (targetClassList) => {
    if (targetClassList.contains(FILTER.ALL)) {
      $store.filter.setFilter(FILTER.ALL);
    } else if (targetClassList.contains(FILTER.ACTIVE)) {
      $store.filter.setFilter(FILTER.ACTIVE);
    } else if (targetClassList.contains(FILTER.COMPLETED)) {
      $store.filter.setFilter(FILTER.COMPLETED);
    }
    render();
  };

  const handleTodoFiltering = (e) => {
    toggleFilterSelected(e.target);
    filterTodo(e.target.classList);
  };

  $filter.addEventListener(EVENT.CLICK, handleTodoFiltering);
}
