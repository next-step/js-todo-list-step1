export default function TodoList({ toggleTodo }) {
  const $list = document.querySelector(".todo-list");

  const render = (todos) => {
    $list.innerHTML = todos.map((todo) => todo.render()).join("");
  };

  const handleToggleTodo = ({ target }) => {
    if (!target.classList.contains("toggle")) {
      return;
    }

    const $target = target.closest("li");
    const targetId = parseInt($target.dataset.id);
    toggleTodo(targetId);
  };

  $list.addEventListener("click", handleToggleTodo);

  return {
    render,
  };
}
