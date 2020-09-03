import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App {
  todoItems = [];

  setTodoItems = (todoItems) => {
    this.todoItems = todoItems;
    this.todoList.setTodoItems(todoItems);
  };

  addTodoItems = (todoItem) => {
    this.setTodoItems([...this.todoItems, todoItem]);
  };

  constructor() {
    this.$App = document.querySelector('.todoapp');
  }

  todoInput = new TodoInput(this.addTodoItems);
  todoList = new TodoList();
}

export default App;
