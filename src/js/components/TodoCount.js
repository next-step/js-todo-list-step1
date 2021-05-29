export default function TodoCount() {
  const $todoCount = document.querySelector('strong');
  this.showCount = (item) => {
    $todoCount.textContent = item;
  }
}