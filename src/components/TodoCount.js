export default function TodoCount() {
  this.$todoCount = document.querySelector(".todo-count");

  this.setCount = (items) => {
    this.$todoCount.childNodes[1].textContent = items.length;
  };
}
