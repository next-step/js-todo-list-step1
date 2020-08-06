import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';

import { SELECTOR } from '../utils/constant.js';

function App($target) {
  this.init = () => {
    this.$target = $target;
    this.state = {
      todos: [],
    };

    this.todoInput = new TodoInput({
      $target: document.querySelector(SELECTOR.TODO_INPUT),
      onAddTodo: this.onAddTodo,
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

    // console.log(nextState);
  };

  this.init();
}

export default App;
