export default function TodoItemTitle({id, title, updateTodoStatus}) {
  const element = document.createElement("label");
  element.classList.add("label")
  element.textContent = title;
  element.addEventListener("dblclick", () => {
    updateTodoStatus({id, "status": true});
  });

  return {
    render: () => element

  }
}
