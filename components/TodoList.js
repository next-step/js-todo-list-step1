import TodoItem from './TodoItem';

class TodoList {
  $todoList = document.querySelector('#todo-list');
  constructor(todos) {
    this.todos = todos;
    this.render();
    this.$todoList.addEventListener('click', this.completeTodo);
  }

  setTodos = (todos) => {
    this.todos = todos;
    this.render();
  };

  completeTodo = (e) => {
    if (e.target.nodeName === 'INPUT' && e.target.parentElement.parentElement) {
      e.target.toggleAttribute('checked');
      e.target.parentElement.parentElement.classList.toggle('completed');
    }
  };

  render() {
    this.$todoList.innerHTML = '';
    this.todos.forEach((todo) => {
      new TodoItem(this.$todoList, todo);
    });
  }
}

export default TodoList;
