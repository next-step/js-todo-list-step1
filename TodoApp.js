// 부모 컴포넌트
function TodoApp() {
    this.todoItems = [];

    this.todoList = new TodoList();
  
    this.setState = updatedItems => {
      this.todoItems = updatedItems;
      this.todoList.setState(this.todoItems);
    };
  
    new TodoInput({
      onAdd: contents => {
        const newTodoItem = new TodoItem(contents);
        this.todoItems.push(newTodoItem);
        this.setState(this.todoItems);
      }
    });
}