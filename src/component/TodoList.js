export default function TodoList({ toggleTodo, deleteTodo, editTodo }) {
  const $list = document.querySelector(".todo-list");

  const render = (todos) => {
    $list.innerHTML = todos.map((todo) => todo.render()).join("");
  };

  const findTargetId = (target) => {
    const $target = target.closest("li");
    return parseInt($target.dataset.id);
  };

  const handleToggleTodo = ({ target }) => {
    if (!target.classList.contains("toggle")) {
      return;
    }

    const targetId = findTargetId(target);
    toggleTodo(targetId);
  };

  const handleDeleteTodo = ({ target }) => {
    if (!target.classList.contains("destroy")) {
      return;
    }

    const targetId = findTargetId(target);
    deleteTodo(targetId);
  };

  const handleEditTodo = ({ key, target }) => {
    if (key !== "Enter") {
      return;
    }

    const targetId = findTargetId(target);

    const contents = target.value.trim();
    if (contents === "") {
      return;
    }

    editTodo(targetId, contents);
  };

  const handleCancelEditingTodo = ({ target }) => {
    const $target = target.closest("li");
    $target.classList.remove("editing");
  };

  const handleToggleEditingTodo = ({ target }) => {
    if (!target.classList.contains("label")) {
      return;
    }

    const $target = target.closest("li");
    $target.classList.add("editing");
    const $editingInput = $target.querySelector(".edit");
    $editingInput.addEventListener("keypress", handleEditTodo);
    $editingInput.addEventListener("focusout", handleCancelEditingTodo);
  };

  $list.addEventListener("click", handleToggleTodo);
  $list.addEventListener("click", handleDeleteTodo);
  $list.addEventListener("dblclick", handleToggleEditingTodo);

  return {
    render,
  };
}
