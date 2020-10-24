function TodoCount() {
  const $total = document.querySelector(".todo-count");
  const $totalNum = $total.querySelector("strong");
  this.showCount = (todoList) => {
    $totalNum.innerText = todoList.length;
  };
}

export default TodoCount;
