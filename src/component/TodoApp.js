import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import { TodoItem } from "./TodoItem.js";

export default function TodoApp() {
  this.itemId = 1;
  this.todoItems = [];
  this.todoList = new TodoList();
  this.todoInput = new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents, this.itemId++);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.todoList.setState(this.todoItems);
  };
}
