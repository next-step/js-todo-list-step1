import TodoItem from './TodoItem';

class TodoList {
  $todoList = document.querySelector('#todo-list');
  constructor(todos, deleteTodo, editTodo) {
    this.todos = todos;
    this.render();
    this.$todoList.addEventListener('click', (e) =>
      this.handleClick(e, deleteTodo)
    );
    this.$todoList.addEventListener('dblclick', this.handleDblClick);
    this.$todoList.addEventListener('keyup', (e) =>
      this.handleKeyUp(e, editTodo)
    );
  }

  setTodos = (todos) => {
    this.todos = todos;
    this.render();
  };

  handleClick = (e, deleteTodo) => {
    if (e.target.parentElement.parentElement.nodeName === 'LI') {
      const $li = e.target.parentElement.parentElement;
      if (e.target.className === 'toggle') this.completeTodo(e.target, $li);
      else if (e.target.className === 'destroy')
        deleteTodo(parseInt($li.dataset.key));
    }
  };

  handleDblClick = (e) => {
    if (e.target.parentElement.parentElement.nodeName === 'LI') {
      const $li = e.target.parentElement.parentElement;
      if (e.target.className === 'label') this.startEditing(e.target, $li);
    }
  };

  handleKeyUp = (e, editTodo) => {
    if (e.target.parentElement.nodeName === 'LI') {
      const $li = e.target.parentElement;
      if (e.key === 'Enter') {
        editTodo(parseInt($li.dataset.key), e.target.value);
        $li.classList.remove('editing');
      } else if (e.key === 'Escape') {
        $li.classList.remove('editing');
      }
    }
  };

  startEditing = ($label, $li) => {
    $li.classList.add('editing');
    $label.parentElement.nextSibling.nextSibling.focus();
  };

  completeTodo = ($checkbox, $li) => {
    $checkbox.toggleAttribute('checked');
    $li.classList.toggle('completed');
  };

  render() {
    this.$todoList.innerHTML = '';
    this.todos.forEach((todo) => {
      new TodoItem(this.$todoList, todo);
    });
  }
}

export default TodoList;
