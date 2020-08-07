import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';

import { SELECTOR } from '../utils/constant.js';
import { dummyTodos } from '../utils/data.js';

function App($target) {
  this.init = () => {
    this.$target = $target;
    this.state = {
      todos: dummyTodos,
    };

    this.todoInput = new TodoInput({
      $target: document.querySelector(SELECTOR.TODO_INPUT),
      onAddTodo: this.onAddTodo,
    });

    this.todoList = new TodoList({
      $target: document.querySelector(SELECTOR.TODO_LIST),
      todos: this.state.todos,
    });
  };

  this.onAddTodo = (keyword) => {
    const todoItem = {
      id: Date.now(),
      title: keyword,
      isCompleted: false,
    };

    const nextState = {
      todos: [...this.state.todos, todoItem],
    };

    this.setState(nextState);
  };

  this.setState = (nextState) => {
    this.state = nextState;

    this.todoList.setState(this.state.todos);
  };

  this.init();
}

export default App;
