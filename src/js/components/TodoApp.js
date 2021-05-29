import { todoItemTemplate } from './templates.js';
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

function TodoItem(todoText) {
  this.id = Date.now().toString();
  this.todo = todoText;
  this.completed = false;
  this.editing = false;
}


function TodoApp() {
  this.todoItems= [];

  const todoList = new TodoList({
    onToggle: (id) => {
      const toggleItem = this.todoItems.find((item) => item.id === id);
      toggleItem.completed = !toggleItem.completed;
      this.setState(this.todoItems);
    },
    onDelete: (id) => {
      const deletedItemIndex = this.todoItems.findIndex((item) => item.id === id);
      this.todoItems.splice(deletedItemIndex, 1);
      this.setState(this.todoItems);
    },
    onEdit: (id) => {
      const editItem = this.todoItems.find((item) => item.id === id);
      editItem.editing = !editItem.editing;
      this.setState(this.todoItems);
    },
    onEndEdit: (contents, id) => {
      const editItem = this.todoItems.find((item) => item.id === id);
      editItem.todo = contents;
      editItem.editing = !editItem.editing;
      this.setState(this.todoItems);
    }
  });

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    }
  });
}

new TodoApp();