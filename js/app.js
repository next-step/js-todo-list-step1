import TodoList from './components/TodoList.js';
import TodoInput from './components/TodoInput.js';

class App {
  constructor() {
    this.todoItems = [];

    this.todoList = new TodoList({
      $element: document.getElementById('todo-list'),
      items: this.todoItems
    });

    this.todoInput = new TodoInput({
      $element: document.getElementById('new-todo-title'),
      onEnter: newContent => {
        this.setState([...this.todoItems, { content: newContent, isCompleted: false }]);
      }
    });
  }

  setState(newItems) {
    this.todoList.setState(newItems);
    this.todoItems = newItems;
  }
}

new App();
