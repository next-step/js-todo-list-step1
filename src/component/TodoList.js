export default function TodoList() {
  const $list = document.querySelector(".todo-list");

  const render = (todos) => {
    $list.innerHTML = todos.map((todo) => todo.render()).join("");
  };

  return {
    render,
  };
}
