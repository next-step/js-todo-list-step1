import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import { storage } from './utills/storage.js';
export default class App {
  constructor(){
    this.todoItems = storage.get('todo') || []; 

    this.setState = updatedItems => {
      storage.set('todo', this.todoItems) 
      this.todoItems = updatedItems;
      new TodoList(this.todoItems);
    };

    
    this.init();
    
  }
  
  init(){
    new TodoInput({
      onAdd: (todo) => {
        this.todoItems.push(todo);
        this.setState(this.todoItems)
      }
    });
    new TodoList(this.todoItems);
  }
}
