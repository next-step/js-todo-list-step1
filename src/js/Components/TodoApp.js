import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

function TodoItem(todoText) {
  this.id = Date.now();
  this.todo = todoText;
  this.completed = false;
}

function TodoApp() {
  this.todoItems = [];

  const todoList = new TodoList();

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.render(this.todoItems);
  };

  TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });
}

export default TodoApp;
