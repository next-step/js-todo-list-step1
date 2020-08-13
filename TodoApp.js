// 부모 컴포넌트
function TodoApp() {

    this.todoList = new TodoList();
  
    this.setState = updatedItems => {
      this.todoList.setState(updatedItems);
    };

    document.querySelector(".all-selected").addEventListener("click", () => {
      this.todoList.setState("all");
    });
    document.querySelector(".active").addEventListener("click", () => {
      this.todoList.setState("active");
    });
    document.querySelector(".completed").addEventListener("click", () => {
      this.todoList.setState("completed");
    });

    new TodoInput({
      onAdd: contents => {
        const newTodoItem = new TodoItem(contents, false);
        this.todoList.addItem(newTodoItem);
      }
    });
}