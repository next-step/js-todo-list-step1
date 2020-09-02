import TodoItem from './TodoItem';

class TodoList {
  $todoList = document.querySelector('#todo-list');
  constructor(todos, deleteTodo) {
    this.todos = todos;
    this.render();
    this.$todoList.addEventListener('click', (e) =>
      this.handleClick(e, deleteTodo)
    );
  }

  setTodos = (todos) => {
    this.todos = todos;
    this.render();
  };

  handleClick = (e, deleteTodo) => {
    if (e.target.parentElement.parentElement) {
      if (e.target.className === 'toggle') this.completeTodo(e);
      else if (e.target.className === 'destroy')
        deleteTodo(parseInt(e.target.parentElement.parentElement.dataset.key));
    }
  };

  completeTodo = (e) => {
    e.target.toggleAttribute('checked');
    e.target.parentElement.parentElement.classList.toggle('completed');
  };

  render() {
    this.$todoList.innerHTML = '';
    this.todos.forEach((todo) => {
      new TodoItem(this.$todoList, todo);
    });
  }
}

export default TodoList;
