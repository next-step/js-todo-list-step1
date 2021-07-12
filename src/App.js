import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';
import { storage } from './utills/storage.js';
export default class App {
  constructor() {
    this.todoItems = storage.get('todo') || [];
    this.todoInput = new TodoInput();
    this.todoList = new TodoList();
    this.todoCount = new TodoCount();
    
    this.setState = updatedItems => {
      storage.set('todo', this.todoItems);
      this.todoItems = updatedItems;
      this.todoList.render(this.todoItems)
      this.todoCount.showCount(this.todoItems.length)
    };

    this.init();
  }

  init() {
    this.setState(this.todoItems);
    this.todoInput.setEvent({
      onAdd: text => {
        const todo =  {
          id: Date.now(),
          text,
          completed:false,
        }
        this.todoItems.push(todo);
        this.setState(this.todoItems);
      },
    });
    this.todoList.render(this.todoItems)
    this.todoList.setEvent({
      onDelete: (event) => {
        const target = event.target;
        if (!target.classList.contains('destroy')) return;
        const id = Number(target.closest('li').dataset.id);
        const itemIdx = this.todoItems.findIndex((item) => item.id === id);
        this.todoItems.splice(itemIdx, 1);
        this.setState(this.todoItems);
      },
      onCompleted : (event) =>{
        const target = event.target;
        if (!target.classList.contains('toggle')) return;
        const id = Number(target.closest('li').dataset.id);
        console.log(id)
        const item = this.todoItems.find((todoItem) => todoItem.id === id);
        item.completed = !item.completed;
        this.setState(this.todoItems);
      }
    });
  }
}
