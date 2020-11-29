import { FILTER } from "../constants.js";
import filter from "../filter.js";

export default function TodoFilter(render) {
  const $filter = document.querySelector(".filters");

  const toggleFilterSelected = (target) => {
    const selected = $filter.querySelector(".selected");
    selected.classList.remove("selected");
    target.classList.add("selected");
  };

  const filterTodo = (targetClassList) => {
    if (targetClassList.contains(FILTER.ALL)) {
      filter.setFilter(FILTER.ALL);
    } else if (targetClassList.contains(FILTER.ACTIVE)) {
      filter.setFilter(FILTER.ACTIVE);
    } else if (targetClassList.contains(FILTER.COMPLETED)) {
      filter.setFilter(FILTER.COMPLETED);
    }
    render();
  };

  const handleTodoFiltering = (e) => {
    toggleFilterSelected(e.target);
    filterTodo(e.target.classList);
  };

  $filter.addEventListener("click", handleTodoFiltering);
}
