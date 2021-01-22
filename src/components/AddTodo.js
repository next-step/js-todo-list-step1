export default class AddTodo {
  constructor($newTodoTitle, loadTodo) {
    this.loadTodo = loadTodo;
    $newTodoTitle.addEventListener('keyup', this.addTodo);
  }

  addTodo = ({ target, key }) => {
    if (key === 'Enter' && target.value) {
      this.todos = JSON.parse(localStorage.getItem('todos')) ?? [];
      this.todos.push({
        id: String(Date.now()),
        title: target.value,
        completed: false,
      });
      target.value = '';
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.loadTodo();
    }
  };
}
