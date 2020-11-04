function TodoCount(target, data) {
  const Count = target.querySelector(".count-container");
  const allCount = Count.querySelector("strong");
  allCount.innerText = data.length;
}

export default TodoCount;
