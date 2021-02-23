import { findFilterByClassList } from "../utils/FILTER.js";
import $store from "../store/index.js";

export default function TodoFilter({ filterTodo }) {
  const $filter = document.querySelector(".filters");

  const init = () => {
    const targetClass = "." + $store.todo.getFilter();
    const target = document.querySelector(targetClass);
    target.classList.add("selected");
  };

  const changeSelected = (target) => {
    const $previous = $filter.querySelector(".selected");
    $previous.classList.remove("selected");
    target.classList.add("selected");
  };

  const handleFilterTodo = ({ target }) => {
    if (target.tagName !== "A") {
      return;
    }

    changeSelected(target);
    const selectedFilter = findFilterByClassList(target.classList);
    filterTodo(selectedFilter);
  };

  $filter.addEventListener("click", handleFilterTodo);

  return {
    init,
  };
}
