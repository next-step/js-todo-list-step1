import Component from '../core/component.js';

export default class NewTodoInput extends Component {
  render() {}

  bindEvents() {
    this.$target.addEventListener('keyup', ({ key }) => {
      if (key !== 'Enter') return;
      this.addTodo(this.$target.value);
      this.$target.value = '';
      this.props.onSubmitTodo();
    });
  }

  addTodo(todo) {
    const todoList = this.props.todoList.get();
    todoList.push(todo);
    this.props.todoList.set(todoList);
  }
}
