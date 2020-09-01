import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import TodoTab from './TodoTab.js';

import { SELECTOR, TODO_KEY } from '../utils/constant.js';
import { fetchState, saveState } from '../utils/data.js';
import { checkAppState, checkTarget } from '../utils/validator.js';

function App($target) {
  this.init = () => {
    const initialState = fetchState(TODO_KEY);

    checkTarget($target);
    checkAppState(initialState);

    this.$target = $target;
    this.state = initialState;

    this.todoInput = new TodoInput({
      $target: document.querySelector(SELECTOR.TODO_INPUT),
      onAddTodo: this.onAddTodo,
    });

    this.todoList = new TodoList({
      $target: document.querySelector(SELECTOR.TODO_LIST),
      todoListState: this.state,
      onToggleTodo: this.onToggleTodo,
      onRemoveTodo: this.onRemoveTodo,
      onEditTodo: this.onEditTodo,
    });

    this.todoTab = new TodoTab({
      $target: document.querySelector(SELECTOR.TODO_TAB),
      selectedTab: this.state.selectedTab,
      onChangeTab: this.onChangeTab,
    });

    this.todoCount = new TodoCount({
      $target: document.querySelector(SELECTOR.TODO_COUNT),
      todoCountState: this.state,
    });
  };

  this.onAddTodo = (keyword) => {
    const todoItem = {
      id: Date.now(),
      title: keyword,
      isCompleted: false,
    };

    const nextState = {
      ...this.state,
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

  this.onEditTodo = (todoId, content) => {
    const newTodos = this.state.todos.map((todo) =>
      todo.id === todoId
        ? {
            ...todo,
            title: content,
          }
        : todo,
    );

    const nextState = {
      ...this.state,
      todos: newTodos,
    };

    this.setState(nextState);
  };

  this.onChangeTab = (clickedTab) => {
    const nextState = {
      ...this.state,
      selectedTab: clickedTab,
    };

    this.setState(nextState);
  };

  this.setState = (nextState) => {
    checkAppState(nextState);

    this.state = nextState;
    saveState(TODO_KEY, this.state);

    this.todoList.setState(this.state);
    this.todoCount.setState(this.state);
    this.todoTab.setState(this.state.selectedTab);
  };

  this.init();
}

export default App;
