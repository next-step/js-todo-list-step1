import { setStorage, getStorage as items } from '../utils/storage.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoItem from './TodoItem.js';
import TodoCount from './TodoCount.js';

export default function TodoApp() {
  this.todoItems = [];
  this.todosCount = items().length || 0;

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    
    const updateTodoList = new TodoList();
    updateTodoList.setState(this.todoItems);
    this.todosCount = updateTodoList.todoscount;
  };

  new TodoInput({
    addTodo: contents => {
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
      setStorage('items', this.todoItems);
    }
  });

  new TodoCount(this.todosCount);
}

new TodoApp().setState(items());
