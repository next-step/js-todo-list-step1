function TodoCount(todos) {
  if (!new.target) throw new Error("error: TodoCount must be called with new!");

  this.$count = document.querySelector(".todo-count strong");
  this.todos = todos;

  this.setState = (todos) => {
    this.todos = todos;
    this.render();
  };

  this.render = () => (this.$count.innerHTML = this.todos.length);

  this.render();
}
export default TodoCount;
