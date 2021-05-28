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
  this.filterStatus = 'all';

  this.getFilteredTodoItems = () => {
    if (this.filterStatus === 'all') return this.todoItems;
    if (this.filterStatus === 'active') {
      return this.todoItems.filter((item) => item.isCompleted === false);
    }
    if (this.filterStatus === 'completed') {
      return this.todoItems.filter((item) => item.isCompleted === true);
    }
  };

  this.render = () => {
    const filteredTodoItems = this.getFilteredTodoItems();
    todoList.render(filteredTodoItems);
    todoCount.render(filteredTodoItems.length);
  };

  const todoCount = new TodoCount({
    onFilter: (status) => {
      this.filterStatus = status;
      this.render();
    },
  });

  const todoList = new TodoList({
    onToggle: (id) => {
      const todoItem = this.todoItems.find((item) => item.id === id);
      todoItem.isCompleted = !todoItem.isCompleted;
      this.render();
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
      this.render();
    },
  });
}
