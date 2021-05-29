import { TodoHeader } from './components/todoHeader.js';
import { TodoInput } from './components/todoInput.js';
import { TodoList } from './components/todoList.js';
import { TodoCount } from './components/todoCount.js';
import { ALL, VIEW } from './constant/constant.js';

class App {
  constructor($target) {
    this.state = {
      todos: [],
      selected: ALL
    };
    this.$target = $target;
    // header
    this.header = new TodoHeader(this.$target, 'TODOS');
    this.header.render();

    // todoinput
    this.todoInput = new TodoInput(
      document.querySelector('.new-todo'),
      this.onKeyDown
    );

    // todolist
    this.todoList = new TodoList(
      document.querySelector('.todo-list'),
      this.state,
      this.onDeleteItem,
      this.changeItemState,
      this.changeItemValue
    );

    // todoCount
    this.todoCount = new TodoCount(document.querySelector('.count-container'),
      {
        state: this.state,
        changeSelected: this.changeSelected,
      }
    );
  }

  changeItemState = (index, state) => {
    const newTodos = [...this.state.todos];
    newTodos[index].state = state;
    const newState = {...this.state, todos: newTodos};
    this.setState(newState);
  }

  changeItemValue = (index, value) => {
    const newTodos = [...this.state.todos];
    newTodos[index].value = value;
    const newState = {...this.state, todos: newTodos};
    this.setState(newState);
  }

  changeSelected = (name) => {
    const newState = {...this.state, selected: name};
    this.setState(newState);
  }
  // NOTE onKeyPress(value) {}는 동작하지 않습니다.
  // 왜 안되는지 this에 대해서 다시 공부해봅시다.
  onKeyDown = (value) => {
    const newTodoItems = {...this.state, todos: [...this.state.todos, {value, state: VIEW}]}
    this.setState(newTodoItems);
  };
  onDeleteItem = (index) => {
    const newTodoItems = this.state.todos;
    newTodoItems.splice(index, 1);
    const newState = {...this.state, todos: newTodoItems};
    this.setState(newState);
  };
  setState = (nextState) => {
    this.state = nextState;
    this.todoList.setState(this.state);
    this.todoCount.setState(this.state);
  };
}

new App(document.querySelector('.todoapp'));
