import TodoInput from "./components/TodoInput.js";
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';

class NewTodoItem {
  constructor(text) {
    return {
      completed: false,
      text,
    }
  } 
}

class App {
  constructor(TodoList, TodoCount) {
    this.TodoList = TodoList;
    this.TodoCount = TodoCount;

    this.items = [];

    this.init();
  }

  init() {
    this.setState([]);
    this.setEvent();
  }

  get count() {
    return this.items.length
  }

  setState(updatedItems) {
    this.items = updatedItems.map((item, id) => ({ ...item, id }));
    this.TodoList.setState(this.items);
    this.TodoCount.setState(this.count);
  }

  setEvent() {
    this.addTodo();
  }

  addTodo() {
    new TodoInput({
      add: text => {
        const newItem = new NewTodoItem(text);
        this.items.push(newItem);
        this.setState(this.items);
      }
    })
  }
}

export default function() {
  return new App(new TodoList(), new TodoCount());
}