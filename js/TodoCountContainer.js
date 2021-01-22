export default function TodoCountContainer(countContainerEl, todoApp) {
  const countEl = countContainerEl.querySelector(".todo-count");
  const filtersEl = countContainerEl.querySelector(".filters");
  const filterEls = filtersEl.querySelectorAll("a");

  this.render = function (todos) {
    countEl.innerHTML = `총 <strong>${todos.length}</strong> 개`;
  };

  filtersEl.addEventListener("click", (event) => {
    if (event.target.nodeName !== "A") return;

    filterEls.forEach((el) => {
      const { classList } = el;
      classList.remove("selected");
      if (el !== event.target) return;

      classList.add("selected");
      todoApp.setFilter(
        classList.contains("all") ? null : classList.contains("completed")
      );
    });

    event.preventDefault();
  });
}
