import $store from "../store/index.js";

export default function TodoCount() {
  const $count = document.querySelector(".todo-count").querySelector("strong");

  const renderTodoCount = () => {
    const todos = $store.todo.filterItems();
    $count.innerText = todos.length;
  };

  return {
    renderTodoCount,
  };
}
