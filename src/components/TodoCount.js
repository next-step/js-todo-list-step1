export default function TodoCount() {
  this.todoCount = document.querySelector('.todo-count strong');

  this.setState = (todoItems) => {
    this.todoCount.textContent = todoItems.length;
  };
}
