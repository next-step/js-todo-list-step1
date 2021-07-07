import NewTodoInput from './components/NewTodoInput.js';
import TodoList from './components/TodoList.js';
import Component from './core/component.js';
import State from './core/State.js';
import { $ } from './utils/utils.js';

export default class App extends Component {
  setState() {
    this.todoList = new State([]);
  }

  render() {
    this.mountChildren();
  }

  mountChildren() {
    new NewTodoInput($('#new-todo-title'), {
      todoList: this.todoList,
      onSubmitTodo: this.mountTodoList.bind(this),
    });
  }

  mountTodoList() {
    new TodoList($('#todo-list'), {
      todoList: this.todoList,
      checkTodo: this.checkTodo.bind(this),
      deleteTodo: this.deleteTodo.bind(this),
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
  }

  deleteTodo(id) {
    const todoList = this.todoList.get().filter((todo) => todo.id !== id);
    this.todoList.set([...todoList]);
    console.log(this.todoList);
  }
}
