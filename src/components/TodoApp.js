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
}
