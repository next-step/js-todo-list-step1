export default function TodoCount() {
  const $count = document.querySelector(".todo-count").querySelector("strong");

  const renderTodoCount = (todos) => {
    $count.innerText = todos.length;
  };

  return {
    renderTodoCount,
  };
}
