export default function TodoList({ toggleTodo, deleteTodo }) {
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

  $list.addEventListener("click", handleToggleTodo);
  $list.addEventListener("click", handleDeleteTodo);

  return {
    render,
  };
}
