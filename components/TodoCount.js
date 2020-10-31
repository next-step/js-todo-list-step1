function TodoCount() {
  if (!new.target) throw new Error("error: TodoCount must be called with new!");

  this.$count = document.querySelector(".todo-count strong");

  this.setState = (todos) => {
    this.todos = todos;
    this.render();
  };

  this.render = () => (this.$count.innerHTML = this.todos.length);
}
export default TodoCount;
