import { FILTER } from '../constants/constatns.js';

// state
import TodoState from '../store/todoState.js';

// components
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';

export default class TodoApp {
  constructor() {
    // state
    this.filterState = FILTER.ALL;
    this.todoState = TodoState;

    // components
    new TodoInput({ setTodoList: this.setTodoList.bind(this) });
    this.todoList = new TodoList({ setTodoList: this.setTodoList.bind(this) });
    this.todoCount = new TodoCount({
      setFilter: this.setFilter.bind(this),
    });

    this._render();
  }

  setFilter(changeFilter) {
    this.filterState = changeFilter;
    this._render();
  }

  setTodoList(updatedTodoList) {
    this.todoState.setTodoList(updatedTodoList);
    this._render();
  }

  _render() {
    let todoList = [];
    switch (this.filterState) {
      case FILTER.ALL:
        todoList = this.todoState.get();
        break;
      case FILTER.ACTIVE:
        todoList = this.todoState.get().filter((todoItem) => todoItem.isDone !== true);
        break;
      case FILTER.COMPLETED:
        todoList = this.todoState.get().filter((todoItem) => todoItem.isDone === true);
        break;
    }

    this.todoList.render(todoList);
    this.todoCount.renderCount(todoList.length);
  }
}
