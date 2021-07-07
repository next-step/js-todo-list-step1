import NewTodoInput from './components/NewTodoInput.js';
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
      onSubmitTodo: this.onSubmitTodo,
    });
  }

  onSubmitTodo() {
    console.log(this.todoList);
  }
}
