export default function TodoCount() {
  const $todoCount = document.querySelector('.todo-count strong');

  this.render = (todoCount) => {
    $todoCount.innerText = todoCount;
  };
}
