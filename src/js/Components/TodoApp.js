import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

function TodoItem(todoText) {
  this.id = Date.now().toString();
  this.todo = todoText;
  this.completed = false;
}

function TodoApp() {
  this.todoItems = [];

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.render(this.todoItems);
  };

  const handleAdd = (contents) => {
    const newTodoItem = new TodoItem(contents);
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems);
  };

  const handleToggle = (id) => {
    const toggledItem = this.todoItems.find((item) => item.id === id);
    toggledItem.completed = !toggledItem.completed;
    this.setState(this.todoItems);
  };

  const todoList = new TodoList({ onToggle: handleToggle });

  TodoInput({ onAdd: handleAdd });
}

export default TodoApp;
