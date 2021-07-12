import { FILTER, LOCAL_DB_KEY } from '../constants/constatns.js';
import localDB from '../utils/localStorage.js';

// state
import TodoState from '../store/todoState.js';
import FilterState from '../store/filterState.js';

// components
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';

export default class TodoApp {
  constructor() {
    // state
    this.todoState = TodoState;
    this.filterState = FilterState;

    // components
    new TodoInput({ setTodoList: this.setTodoList.bind(this) });
    this.todoList = new TodoList({ setTodoList: this.setTodoList.bind(this) });
    this.todoCount = new TodoCount({
      setFilter: this.setFilter.bind(this),
    });

    const emptyLocalDB = !localDB.getData(LOCAL_DB_KEY);
    if (emptyLocalDB) {
      localDB.setData(LOCAL_DB_KEY, []);
    }

    const DBData = localDB.getData(LOCAL_DB_KEY);
    this.todoState.setTodoList(JSON.parse(DBData));

    this._render();
  }

  setFilter(updatedFilter) {
    this.filterState.setFilter(updatedFilter);
    this._render();
  }

  setTodoList(updatedTodoList) {
    this.todoState.setTodoList(updatedTodoList);
    localDB.setData(LOCAL_DB_KEY, updatedTodoList);
    this._render();
  }

  _render() {
    let todoList = [];
    const filter = this.filterState.get();

    switch (filter) {
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
