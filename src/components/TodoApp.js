import TodoItem from './TodoItem.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import { TodoFilter, FilterType } from './TodoFilter.js';

export default function TodoApp() {
  let id = 0;
  this.todoItems = [];

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents, ++id);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });

  const todoList = new TodoList({
    onEditing: (id) => {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id === id) {
          item.editing = !item.editing;
        }
        return item;
      });
      todoList.setState(this.todoItems);
    },
    onComplete: (id) => {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      });
      todoList.setState(this.todoItems);
    },
    onDelete: (id) => {
      this.todoItems = this.todoItems.filter((item) => {
        return item.id !== id;
      });
      todoList.setState(this.todoItems);
    },
    onEdit: (e, id) => {
      if (e.key === 'Enter') {
        this.todoItems = this.todoItems.map((item) => {
          if (item.id === id) {
            item.contents = e.target.value;
            item.editing = false;
          }
          return item;
        });
        todoList.setState(this.todoItems);
      }
      if (e.key === 'Escape') {
        this.todoItems = this.todoItems.map((item) => {
          if (item.id === id) {
            item.editing = false;
          }
          return item;
        });
        todoList.setState(this.todoItems);
      }
    },
  });
}
