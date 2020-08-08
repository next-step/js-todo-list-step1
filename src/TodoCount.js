export default function TodoCount(
  $todoCount,
  { parentRender, getFilteredItem }
) {
  // 화면 하단 필터 선택 시 필터 적용
  this.changeSelected = (filter) => {
    const $target = $todoCount.querySelector(`.${filter}`);
    $todoCount.querySelector(".selected").classList.remove("selected");
    $target.classList.add("selected");
    parentRender(getFilteredItem(filter));
  };

  $todoCount.addEventListener("click", (event) => {
    const $target = event.target;

    if ($target.nodeName === "A") {
      this.changeSelected($target.className);
    }
  });

  this.render = (count) => {
    $todoCount.querySelector(".todo-count strong").textContent = count;
  };
}
