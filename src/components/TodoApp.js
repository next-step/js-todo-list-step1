import TodoCount from './TodoCount.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

function TodoItem(value) {
  this.id = Date.now().toString();
  this.value = value;
  this.isCompleted = false;
}

export default function TodoApp() {
  this.todoItems = [];

  const todoCount = new TodoCount();

  const todoList = new TodoList({
    onToggle: (id) => {
      const todoItem = this.todoItems.find((item) => item.id === id);
      todoItem.isCompleted = !todoItem.isCompleted;
    },
    onRemove: (id) => {
      this.todoItems = this.todoItems.filter((item) => item.id !== id);
      todoCount.render(this.todoItems.length);
    },
    onUpdate: (id, value) => {
      const todoItem = this.todoItems.find((item) => item.id === id);
      todoItem.value = value;
    },
  });

  new TodoInput({
    onAdd: (value) => {
      const newTodoItem = new TodoItem(value);
      this.todoItems.push(newTodoItem);
      todoList.render(this.todoItems);
      todoCount.render(this.todoItems.length);
    },
  });
}
