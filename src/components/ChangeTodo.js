export default class ChangeTodo {
  constructor($todoList, loadTodo) {
    $todoList.addEventListener('click', ({ target }) => {
      this.changeTodo({ target }, loadTodo);
    });
  }

  changeTodo = ({ target }, loadTodo) => {
    this.todos = JSON.parse(localStorage.getItem('todos'));
    if (target.className === 'toggle') {
      this.todos.map((todo) => {
        if (todo.id === target.id) {
          todo.completed = !todo.completed;
        }
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));
      loadTodo();
    } else if (target.className === 'destroy') {
      this.todos = this.todos.filter((todo) => {
        if (todo.id !== target.id) {
          return todo;
        }
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));
      loadTodo();
    }
  };
}
