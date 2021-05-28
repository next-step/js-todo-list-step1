function TodoCount(target) {
  this.setState = (updatedTodoItems) => {
    this.render(updatedTodoItems);
  };

  this.render = (todoItems) => {
    target.innerHTML = todoItems.length;
  };
}

export default TodoCount;
