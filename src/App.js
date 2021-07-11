import NewTodoInput from './components/NewTodoInput.js';
import TodoCount from './components/TodoCount.js';
import TodoList from './components/TodoList.js';
import Component from './core/component.js';
import State from './core/State.js';
import { FILTER_TYPES, STORAGE_KEY } from './utils/constants.js';
import { $, setLocalStorageItem, getLocalStorageItem } from './utils/utils.js';

export default class App extends Component {
  setState() {
    this.todoList = new State(getLocalStorageItem(STORAGE_KEY.TODO) || []);
    this.filteredTodoList = new State(null);
    this.filterState = new State('all');
  }

  render() {
    this.mountChildren();
    this.mountTodoList();
  }

  setFilteredTodoList() {
    const filterTodo = Object.freeze({
      [FILTER_TYPES.ALL]: this.viewAllTodo.bind(this),
      [FILTER_TYPES.ACTIVE]: this.viewActiveTodo.bind(this),
      [FILTER_TYPES.COMPLETED]: this.viewCompletedTodo.bind(this),
    });
    filterTodo[this.filterState.get()]();
    // this.todoListView.setState(this.filteredTodoList.get());
    // this.todoListView.render();
    this.renderComponent(this.todoListView);
    this.renderComponent(this.todoCountView);
    this.todoCountView.setState(this.filteredTodoList.get());
    this.todoCountView.render();
  }

  renderComponent(view) {
    view.setState(this.filteredTodoList.get());
    view.render();
  }

  viewAllTodo() {
    this.filteredTodoList.set(this.todoList.get());
  }

  viewActiveTodo() {
    const activeTodo = this.todoList.get().filter((todo) => todo.checked === false);
    this.filteredTodoList.set(activeTodo);
  }

  viewCompletedTodo() {
    const completedTodo = this.todoList.get().filter((todo) => todo.checked === true);
    this.filteredTodoList.set(completedTodo);
  }

  mountChildren() {
    new NewTodoInput($('#new-todo-title'), {
      todoList: this.todoList,
      onSubmitTodo: this.mountTodoList.bind(this),
    });
  }

  mountTodoList() {
    this.todoListView = new TodoList($('#todo-list'), {
      todoList: this.filteredTodoList.get() === null ? this.todoList.get() : this.filteredTodoList.get(),
      checkTodo: this.checkTodo.bind(this),
      deleteTodo: this.deleteTodo.bind(this),
      editTodo: this.editTodo.bind(this),
    });

    this.todoCountView = new TodoCount($('.count-container'), {
      todoList: this.filteredTodoList.get() === null ? this.todoList.get() : this.filteredTodoList.get(),
      filterState: this.filterState,
      onClickTodoRender: this.setFilteredTodoList.bind(this),
    });
  }

  checkTodo(id) {
    const todoList = this.todoList.get().map((todo) => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
        return todo;
      }
      return todo;
    });
    this.todoList.set([...todoList]);
    setLocalStorageItem(STORAGE_KEY, todoList);
  }

  deleteTodo(id) {
    const todoList = this.todoList.get().filter((todo) => todo.id !== id);
    setLocalStorageItem(STORAGE_KEY.TODO, todoList);
    this.todoList.set([...todoList]);
    this.todoCountView.render();
  }

  editTodo(id, value) {
    const todoList = this.todoList.get().map((todo) => {
      if (todo.id === id) {
        todo.todo = value;
        return todo;
      }
      return todo;
    });
    setLocalStorageItem(STORAGE_KEY.TODO, todoList);
    this.todoList.set([...todoList]);
    this.todoListView.render();
  }
}
