export default function TodoCount() {
  const $count = document.querySelector(".todo-count");

  const render = (todos) => {
    $count.innerHTML = `총 <strong>${todos.length}</strong> 개`;
  };

  return {
    render,
  };
}
