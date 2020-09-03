import TodoListItem from './TodoListItem';

class TodoList {
  todoItems = [];
  constructor() {
    this.$todoList = document.querySelector('.todo-list');
    this.render();
  }

  setTodoItems = (todoItems) => {
    this.todoItems = todoItems;
    this.render();
    2;
  };

  render() {
    this.$todoList.innerHTML = '';
    this.todoItems.map(
      (todoItem) => new TodoListItem(this.$todoList, todoItem)
    );
  }
}

export default TodoList;
