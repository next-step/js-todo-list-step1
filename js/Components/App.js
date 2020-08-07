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
      onToggleTodo: this.onToggleTodo,
      onRemoveTodo: this.onRemoveTodo,
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

  this.onToggleTodo = (todoId) => {
    const newTodos = this.state.todos.map((todo) => {
      return todoId === todo.id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo;
    });

    const nextState = {
      ...this.state,
      todos: newTodos,
    };

    this.setState(nextState);
  };

  this.onRemoveTodo = (todoId) => {
    const newTodos = this.state.todos.filter(({ id }) => todoId !== id);

    const nextState = {
      ...this.state,
      todos: newTodos,
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
