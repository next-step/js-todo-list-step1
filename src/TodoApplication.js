import TodoInput from './components/TodoInput.js';
import TodoItem from './components/TodoItem.js';
import TodoList from './components/TodoList.js';

export default class TodoApplication {
  constructor() {
    this.todoItems = [];
    this.todoInput = new TodoInput({ onAdd: this.onAdd.bind(this) });
    this.todoList = new TodoList(this.todoItems);
  }

  onAdd(content) {
    const todoItem = new TodoItem({ content });
    this.todoItems.push(todoItem);
    this.setState(this.todoItems);
  }

  setState(todoItems) {
    this.todoList.setState(todoItems);
  }
}
