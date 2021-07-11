import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import { storage } from './utills/storage.js';
export default class App {
  constructor() {
    this.todoItems = storage.get('todo') || [];
    this.todoInput = new TodoInput();
    this.todoList = new TodoList();
    
    this.setState = updatedItems => {
      storage.set('todo', this.todoItems);
      this.todoItems = updatedItems;
      this.todoList.render(this.todoItems)
    };

    this.init();
  }

  init() {
    this.todoInput.setEvent({
      onAdd: todo => {
        this.todoItems.push(todo);
        this.setState(this.todoItems);
      },
    });
    this.todoList.render(this.todoItems)
    this.todoList.setEvent({
      onDelete: (event) => {
        const item = event.target
        if (!item.classList.contains('destroy')) return;
        const id = Number(item.closest('li').dataset.id);
        const itemIdx = this.todoItems.findIndex((i) => i.id === id);
        this.todoItems.splice(itemIdx, 1);
        this.setState(this.todoItems);
      },
    });
  }
}
