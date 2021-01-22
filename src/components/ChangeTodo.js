export default class ChangeTodo {
  constructor($todoList, loadTodo) {
    this.loadTodo = loadTodo;
    $todoList.addEventListener('click', this.changeTodo);
  }

  changeTodo = ({ target }) => {
    this.todos = JSON.parse(localStorage.getItem('todos'));
    if (target.className === 'toggle') {
      this.todos.map((todo) => {
        if (todo.id === target.id) {
          todo.completed = !todo.completed;
        }
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.loadTodo();
    } else if (target.className === 'destroy') {
      this.todos = this.todos.filter((todo) => {
        if (todo.id !== target.id) {
          return todo;
        }
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.loadTodo();
    }
  };
}
