export default class EditTodo {
  constructor($todoList, loadTodo) {
    this.loadTodo = loadTodo;

    $todoList.addEventListener('dblclick', this.editTodo);
  }

  updateTodoItem = (listId, value) => {
    this.todos.map((todo) => {
      if (todo.id === listId) {
        todo.title = value;
      }
    });
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.loadTodo();
  };

  editTodoItem = ({ target, key }) => {
    switch (key) {
      case 'Enter':
        return this.updateTodoItem(target.closest('li').id, target.value);
      case 'Escape':
        return target.closest('li').classList.remove('editing');
    }
  };

  editTodo = ({ target }) => {
    this.todos = JSON.parse(localStorage.getItem('todos'));

    if (target.className === 'label') {
      target.closest('li').classList.add('editing');
      target.closest('li').addEventListener('keyup', this.editTodoItem);
    }
  };
}
