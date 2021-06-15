export default function TodoCount() {
  this.$todoCount = document.querySelector(".todo-count");

  this.setCount = (todoItems) => {
    this.$todoCount.childNodes[1].textContent = todoItems.length;
  };
}
