import TodoItem from './TodoItem';

class TodoList {
  todos;

  constructor(deleteTodo, editTodo, toggleActiveTodo) {
    this.$todoList = document.querySelector('#todo-list');
    this.todos = [];

    this.initAddEventListener(
      this.$todoList,
      deleteTodo,
      editTodo,
      toggleActiveTodo
    );
  }

  initAddEventListener = ($target, deleteTodo, editTodo, toggleActiveTodo) => {
    $target.addEventListener('click', (e) =>
      this.handleClick(e, deleteTodo, toggleActiveTodo)
    );
    $target.addEventListener('dblclick', this.handleDblClick);
    $target.addEventListener('keyup', (e) => this.handleKeyUp(e, editTodo));
  };

  setTodos = (todos) => {
    this.todos = todos;
    this.render();
  };

  handleClick = (e, deleteTodo, toggleActiveTodo) => {
    if (e.target.parentElement.parentElement.nodeName === 'LI') {
      const $li = e.target.parentElement.parentElement;
      if (e.target.className === 'toggle')
        this.completeTodo($li, toggleActiveTodo);
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

  completeTodo = ($li, toggleActiveTodo) => {
    $li.classList.toggle('completed');
    setTimeout(() => toggleActiveTodo(parseInt($li.dataset.key)), 200);
  };

  render() {
    this.$todoList.innerHTML = '';
    for (let todo of this.todos) new TodoItem(this.$todoList, todo);
  }
}

export default TodoList;
