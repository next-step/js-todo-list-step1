import TodoTitle from './components/TodoTitle.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';

import { ALL, ACTIVE, COMPLETED } from "./constants/todoState.js";
import { setTodos, getTodos } from './utils/localStorage.js';

export default class App {
  constructor($app) {
    this.state = {
      todos: getTodos() || [],
      count: (getTodos() || []).length,
      show: ALL,
    };

    new TodoTitle({ $app });

    new TodoInput({
      $app,
      addTodo: (inputValue) => {
        const todos = this.state.todos;
        const newTodo = {
          id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
          title: inputValue,
          state: ACTIVE,
        };
        this.setState({
          ...this.state,
          todos: [...this.state.todos, newTodo],
        });
      },
    });

    this.todoList = new TodoList({
      $app,
      initialState: {
        todos: this.state.todos,
        show: this.state.show,
      },
      toggleTodo: (id) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map((todo) => {
            if (todo.id === id)
              todo.state = todo.state === ACTIVE ? COMPLETED : ACTIVE;
            return todo;
          }),
        });
      },
      removeTodo: (id) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.filter((todo) => todo.id !== id),
        });
      },
      modifyTodo: (id, value) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map((todo) => {
            if (todo.id === id) todo.title = value;
            return todo;
          }),
        });
      },
    });

    this.todoCount = new TodoCount({
      $app,
      initialState: {
        count: this.state.count,
        show: this.state.show,
      },
      changeShow: (show) => {
        this.setState({
          ...this.state,
          show,
        });
      },
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.todoList.setState({
      todos: this.state.todos,
      show: this.state.show,
    });
    this.todoCount.setState({
      count: this.state.todos.filter(({ state }) => {
        if (this.state.show === ALL) return true;
        return this.state.show === state;
      }).length,
      show: this.state.show,
    });
    setTodos(this.state.todos);
  }
}
