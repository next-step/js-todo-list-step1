import { createElement } from "../utils/createElement.js";

export default function TodoListItem({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
}) {
  const $item = createElement(todo.render());
  const $toggleBtn = $item.querySelector(".toggle");
  const $deleteBtn = $item.querySelector(".destroy");
  const $label = $item.querySelector(".label");
  const $editInput = $item.querySelector(".edit");

  const id = parseInt($item.dataset.id);

  const handleToggleTodo = () => {
    toggleTodo(id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(id);
  };

  const handleToggleEditingTodo = () => {
    const $editingItem = document.querySelector(".editing");
    $editingItem?.classList.remove("editing");

    $item.classList.add("editing");
  };

  const handleEditTodo = ({ key, target }) => {
    if (key !== "Enter") {
      return;
    }

    const contents = target.value.trim();
    if (contents === "") {
      return;
    }

    $label.innerText = contents;
    editTodo(id, contents);

    $item.classList.remove("editing");
  };

  const handleCancelEditingTodo = () => {
    $editInput.value = todo.contents;
    $item.classList.remove("editing");
  };

  $toggleBtn.addEventListener("click", handleToggleTodo);
  $deleteBtn.addEventListener("click", handleDeleteTodo);
  $label.addEventListener("dblclick", handleToggleEditingTodo);
  $editInput.addEventListener("keypress", handleEditTodo);
  $editInput.addEventListener("focusout", handleCancelEditingTodo);

  return {
    dom: $item,
  };
}
