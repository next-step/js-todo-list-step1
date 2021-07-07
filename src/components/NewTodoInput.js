import Component from '../core/component.js';

export default class NewTodoInput extends Component {
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
    todoList.push({
      id: Date.now(),
      todo,
      checked: false,
    });
    this.props.todoList.set(todoList);
  }
}
