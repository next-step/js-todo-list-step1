export default class EditTodo {
  constructor($todoList, loadTodo) {
    $todoList.addEventListener('dblclick', ({ target }) => {
      this.editTodo({ target }, loadTodo);
    });
  }

  editTodo = ({ target }, loadTodo) => {
    this.todos = JSON.parse(localStorage.getItem('todos'));
    const updatedTodoItem = (id, value) => {
      this.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = value;
        }
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));
      loadTodo();
    };

    const edit = ({ target, key }) => {
      if (key === 'Enter') {
        updatedTodoItem(target.closest('li').id, target.value);
      } else if (key === 'Escape') {
        target.closest('li').classList.remove('editing');
      }
    };

    if (target.className === 'label') {
      target.closest('li').classList.add('editing');
      target.closest('li').addEventListener('keyup', edit);
    }
  };
}
