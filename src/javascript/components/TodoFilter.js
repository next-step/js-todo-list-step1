function TodoFilter({ filtering }) {
  const filters = document.querySelector(".filters");
  const filterButtons = filters.querySelectorAll("a");

  const allFilter = filters.querySelector(".all");
  const activeFilter = filters.querySelector(".active");
  const completedFilter = filters.querySelector(".completed");

  const removeSelectedClass = () => {
    filterButtons.forEach((filter) => {
      filter.classList.remove("selected");
    });
  };

  const addSelectedClass = (target) => {
    target.classList.add("selected");
  };

  allFilter.addEventListener("click", () => {
    removeSelectedClass();
    addSelectedClass(allFilter);
    filtering("all");
  });
  activeFilter.addEventListener("click", () => {
    removeSelectedClass();
    addSelectedClass(activeFilter);
    filtering("active");
  });
  completedFilter.addEventListener("click", () => {
    removeSelectedClass();
    addSelectedClass(completedFilter);
    filtering("completed");
  });
}

export default TodoFilter;
