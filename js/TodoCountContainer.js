export default function TodoCountContainer(countContainerEl, todoApp) {
  const countEl = countContainerEl.querySelector(".todo-count");

  this.render = function (items) {
    countEl.innerHTML = `총 <strong>${items.length}</strong> 개`;
  };
}
