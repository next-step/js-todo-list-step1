function TodoList() {
  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join('');
  };
}

export default TodoList;
