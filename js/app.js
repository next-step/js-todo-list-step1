import TodoList from './components/TodoList.js';
import TodoInput from './components/TodoInput.js';

class App {
  constructor() {
    this.todoItems = [];

    this.todoList = new TodoList({
      $element: document.getElementById('todo-list'),
      items: this.todoItems,
      onClickToggle: id => {
        const newTodoItems = [...this.todoItems];
        newTodoItems[id] = {
          content: this.todoItems[id].content,
          isCompleted: !this.todoItems[id].isCompleted
        };
        this.setState(newTodoItems);
      },
      onClickDestroy: id => {
        const newTodoItems = [...this.todoItems];
        newTodoItems.splice(id, 1);
        this.setState(newTodoItems);
      }
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
