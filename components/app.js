import TodoHeader from './todo-header.js';
import TodoList from './todo-list.js';
import TodoInput from './todo-input.js';
import TodoInfo from './todo-info.js';

export default class App {
  constructor() {
    try {
      this.todos = this.getTodos();
      this.filterList = this.getTodoFilter();
      this.filteredTodos = this.filterTodos();
      this.TodoHeaderComponent = new TodoHeader();
      this.todoListComponent = new TodoList(
        this.filteredTodos,
        this.toggleTodo.bind(this),
        this.removeTodo.bind(this)
      );
      this.todoInputComponent = new TodoInput(this.addTodo.bind(this));
      this.todoInfo = new TodoInfo(
        this.filterList,
        this.todos.length,
        this.selectFilter.bind(this)
      );
    } catch (err) {
      console.error(err.message);
    }
  }

  getTodos() {
    const todos = localStorage.getItem('TODOS');
    return JSON.parse(todos) || [];
  }

  getTodoFilter() {
    const todos = localStorage.getItem('TODOS_Filter');
    return (
      JSON.parse(todos) || [
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
      ]
    );
  }

  saveTodoFilter(filters) {
    localStorage.setItem('TODOS_Filter', JSON.stringify(filters));
  }

  saveTodos(todos) {
    localStorage.setItem('TODOS', JSON.stringify(todos));
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
    this.saveTodos(this.todos);
    this.filteredTodos = this.filterTodos();
    this.todoListComponent.setState(this.filteredTodos);
    this.todoInfo.setState(this.filterList, this.filteredTodos.length);
  }

  toggleTodo(targetIndex) {
    const targetTodo = this.todos[targetIndex];
    if (!this.todos[targetIndex]) {
      return false;
    }
    this.todos[targetIndex].toggle = !targetTodo.toggle;
    this.render();
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.render();
  }

  removeTodo(targetIndex) {
    this.todos = this.todos.filter((todo, index) => index !== targetIndex);
    this.render();
  }

  selectFilter(clickedFilter) {
    this.filterList = this.filterList.map((filter) => {
      if (clickedFilter.includes(filter.state)) {
        filter.selected = true;
        location.hash = `#${filter.state}`;
      } else {
        filter.selected = false;
      }
      return filter;
    });
    this.saveTodoFilter(this.filterList);
    this.render();
  }
}
