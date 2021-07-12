export default function TodoCount() {
  const $count = document.querySelector('.todo-count strong');

  this.showCount = (count) => {
    $count.innerHTML = count;
  };
}
