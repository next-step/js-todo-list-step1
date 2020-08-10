import config from '../config/config.js';
import { todoApi } from '../api/api.js';

import TodoHeader from './todo-header.js';
import TodoList from './todo-list.js';
import TodoInput from './todo-input.js';
import TodoInfo from './todo-info.js';

export default class App {
  constructor() {
    const todosFilters = [
      {
        state: 'all',
        title: '전체보기',
        selected: true,
      },
      {
        state: 'active',
        title: '해야할 일',
        selected: false,
      },
      {
        state: 'completed',
        title: '완료한 일',
        selected: false,
      },
    ];
    try {
      this.todos = todoApi.get(config.todos);
      this.filterList = todoApi.get(config.todoFilter, todosFilters);
      this.filteredTodos = this.filterTodos();

      this.todoHeaderComponent = new TodoHeader();
      this.todoListComponent = new TodoList(
        this.filteredTodos,
        this.toggleTodo.bind(this),
        this.editTodo.bind(this),
        this.removeTodo.bind(this)
      );
      this.todoInputComponent = new TodoInput(this.addTodo.bind(this));
      this.todoInfo = new TodoInfo(
        this.filterList,
        this.filteredTodos.length,
        this.selectFilter.bind(this)
      );
    } catch (err) {
      console.error(err.message);
    }
  }

  filterTodos() {
    return this.todos.filter((todo) => {
      if (location.hash === '#active') {
        return !todo.toggle;
      }
      if (location.hash === '#completed') {
        return todo.toggle;
      }
      return true;
    });
  }

  render() {
    this.filteredTodos = this.filterTodos();
    this.todoListComponent.setState(this.filteredTodos);
    this.todoInfo.setState(this.filterList, this.filteredTodos.length);
  }

  setTodoState(todos) {
    this.todos = todos;
    todoApi.set(config.todos, todos);
    this.render();
  }

  setFilterState(filterList) {
    this.filterList = filterList;
    todoApi.set(config.todoFilter, filterList);
    this.render();
  }

  toggleTodo(targetId) {
    const newTodos = this.todos.map((todo) => {
      if (todo.id === targetId) {
        todo.toggle = !todo.toggle;
      }
      return todo;
    });
    this.setTodoState(newTodos);
  }

  addTodo(todo) {
    this.setTodoState([...this.todos, todo]);
  }

  editTodo(targetId, changeValue) {
    const newTodos = this.todos.map((todo) => {
      if (todo.id === targetId) {
        todo.editMode = !todo.editMode;
        if (changeValue && todo.text !== changeValue) {
          todo.text = changeValue;
        }
      }
      return todo;
    });
    this.setTodoState(newTodos);
  }

  removeTodo(targetId) {
    const newTodos = this.todos.filter((todo) => todo.id !== targetId);
    this.setTodoState(newTodos);
  }

  selectFilter(clickedFilter) {
    const newFilterList = this.filterList.map((filter) => {
      if (clickedFilter.includes(filter.state)) {
        filter.selected = true;
        location.hash = `#${filter.state}`;
      } else {
        filter.selected = false;
      }
      return filter;
    });
    this.setFilterState(newFilterList);
  }
}
