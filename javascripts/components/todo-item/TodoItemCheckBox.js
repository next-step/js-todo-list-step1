export default function TodoItemCheckBox({id, isDone, isUpdate, changeTodoDone}) {
  const element = document.createElement("input");
  element.checked = isDone;
  element.type = "checkbox";
  element.classList.add("toggle");

  if (isUpdate) {
    element.classList.add("view");
  }

  element.addEventListener("click", () => {
    changeTodoDone(id, element.checked)
  });

  return {
    render: () => element
  }
}