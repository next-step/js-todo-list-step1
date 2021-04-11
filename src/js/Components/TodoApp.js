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
    this.setState([...this.todoItems, newTodoItem]);
  };

  const handleToggle = (id) => {
    const toggledItem = this.todoItems.find((item) => item.id === id);
    toggledItem.completed = !toggledItem.completed;
    this.setState(this.todoItems);
  };

  const handleDelete = (id) => {
    this.setState(this.todoItems.filter((item) => item.id !== id));
  };

  const handleEdit = (id, todo) => {
    const editItem = this.todoItems.find((item) => item.id === id);
    editItem.todo = todo;
    this.setState(this.todoItems);
  };

  const todoList = new TodoList({
    onToggle: handleToggle,
    onDelete: handleDelete,
    onEdit: handleEdit,
  });

  TodoInput({ onAdd: handleAdd });
}

export default TodoApp;
