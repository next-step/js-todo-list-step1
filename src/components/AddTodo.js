export default class AddTodo {
  constructor($newTodoTitle, { loadTodo }) {
    $newTodoTitle.addEventListener('keyup', ({ target, key }) =>
      this.addTodo({ target, key }, loadTodo),
    );
  }

  addTodo = ({ target, key }, loadTodo) => {
    if (key === 'Enter' && target.value) {
      this.todos = JSON.parse(localStorage.getItem('todos')) ?? [];
      this.todos.push({
        id: String(Date.now()),
        title: target.value,
        completed: false,
      });
      target.value = '';
      localStorage.setItem('todos', JSON.stringify(this.todos));
      loadTodo();
    }
  };
}
