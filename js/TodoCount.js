export default function TodoCount(countContainerEl, todoApp) {
  const countEl = countContainerEl.querySelector(".todo-count");
  const filtersEl = countContainerEl.querySelector(".filters");
  const filterEls = filtersEl.querySelectorAll("a");

  this.setFilter = (targetEl) => {
    filterEls.forEach((el) => {
      if (el !== targetEl) return;

      const { classList } = el;
      todoApp.setFilter(
        classList.contains("all") ? null : classList.contains("completed")
      );
    });
  };

  this.render = (todos) => {
    countEl.innerHTML = `총 <strong>${todos.length}</strong> 개`;

    filterEls.forEach(({ classList }) => {
      classList.remove("selected");
      if (
        (todoApp.filter === null && classList.contains("all")) ||
        (todoApp.filter === false && classList.contains("active")) ||
        (todoApp.filter === true && classList.contains("completed"))
      ) {
        classList.add("selected");
      }
    });
  };

  filtersEl.addEventListener("click", (event) => {
    if (event.target.nodeName !== "A") return;
    this.setFilter(event.target);

    event.preventDefault();
  });
}
