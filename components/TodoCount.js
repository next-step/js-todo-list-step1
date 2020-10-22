function TodoCount(element, todos) {
  if (!(this instanceof TodoCount)) {
    throw new Error("error: TodoCount must be called with new!");
  }

  this.$count = element;
  this.todos = todos;

  this.setState = (todos) => {
    this.todos = todos;
    this.render();
  };

  this.render = () => {
    const completedCount = this.todos.length;
    this.$count.innerHTML = completedCount;
  };

  this.render();
}
export default TodoCount;
