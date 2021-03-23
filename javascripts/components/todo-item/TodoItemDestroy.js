export default function TodoItemDestroy({id, removeTodo}) {
  const element = document.createElement("button");
  element.classList.add("destroy");
  element.textContent = ' ';
  element.addEventListener("click", () => {
    if (confirm("삭제하시겠습니까?")) {
      removeTodo(id);
    }
  })

  return {
    render: () => element
  }
}
