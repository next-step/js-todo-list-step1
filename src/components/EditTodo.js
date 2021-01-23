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

  editTodoItem = ({ target, key }, originalValue) => {
    switch (key) {
      case 'Enter':
        return this.updateTodoItem(target.closest('li').id, target.value);
      case 'Escape':
        target.value = originalValue;
        return target.closest('li').classList.remove('editing');
    }
  };

  editTodo = ({ target }) => {
    this.todos = JSON.parse(localStorage.getItem('todos'));

    if (target.className === 'label') {
      const originalValue = target.innerText;
      target.closest('li').classList.add('editing');
      target
        .closest('li')
        .addEventListener('keyup', ({ target, key }) =>
          this.editTodoItem({ target, key }, originalValue),
        );
    }
  };
}
