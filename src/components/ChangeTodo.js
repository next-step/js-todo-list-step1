export default class ChangeTodo {
  constructor($todoList, loadTodo) {
    this.loadTodo = loadTodo;
    $todoList.addEventListener('click', this.changeTodo);
  }

  toggleTodo = (target) => {
    this.todos.map((todo) => {
      if (todo.id === target.id) {
        todo.completed = !todo.completed;
      }
    });
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.loadTodo();
  };

  removeTodo = (target) => {
    this.todos = this.todos.filter((todo) => {
      if (todo.id !== target.id) {
        return todo;
      }
    });
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.loadTodo();
  };

  changeTodo = ({ target }) => {
    this.todos = JSON.parse(localStorage.getItem('todos'));

    switch (target.className) {
      case 'toggle':
        this.toggleTodo(target);
        break;
      case 'destroy':
        this.removeTodo(target);
    }
  };
}
