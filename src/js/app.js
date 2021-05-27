import { TodoHeader } from './components/todoHeader.js';
import { TodoInput } from './components/todoInput.js';
import { TodoList } from './components/todoList.js';

class App {
  constructor($target) {
    this.state = [];
    this.$target = $target;
    // header
    this.header = new TodoHeader(this.$target, 'TODOS');
    this.header.render();

    // todoinput
    this.todoInput = new TodoInput(
      document.querySelector('.new-todo'),
      this.onKeyPress
    );

    // todolist
    this.todoList = new TodoList(
      document.querySelector('.todo-list'),
      this.state,
      this.onDeleteItem
    );
    // this.todoCount = new TodoCount();
  }
  // NOTE onKeyPress(value) {}는 동작하지 않습니다.
  // 왜 안되는지 this에 대해서 다시 공부해봅시다.
  onKeyPress = (value) => {
    const newTodoItems = [...this.state, value];
    this.setState(newTodoItems);
  };
  onDeleteItem = (index) => {
    const newTodoItems = this.state;
    newTodoItems.splice(index, 1);
    this.setState(newTodoItems);
  };
  setState = (nextState) => {
    this.state = nextState;
    this.todoList.setState(this.state);
    // this.render();
  };
}

new App(document.querySelector('.todoapp'));
