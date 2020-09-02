import TodoItem from './TodoItem';

class TodoList {
  $todoList = document.querySelector('#todo-list');
  constructor(todos, deleteTodo, completeTodo, editTodo) {
    this.todos = todos;
    this.render();
    this.$todoList.addEventListener('click', (e) =>
      this.handleClick(e, deleteTodo, completeTodo)
    );
    this.$todoList.addEventListener('dblclick', (e) =>
      this.handleDblClick(e, editTodo)
    );
  }

  setTodos = (todos) => {
    this.todos = todos;
    this.render();
  };

  handleClick = (e, deleteTodo, completeTodo) => {
    if (e.target.parentElement.parentElement.nodeName === 'LI') {
      const $li = e.target.parentElement.parentElement;
      if (e.target.className === 'toggle') completeTodo(e.target, $li);
      else if (e.target.className === 'destroy')
        deleteTodo(parseInt($li.dataset.key));
    }
  };

  handleDblClick = (e, editTodo) => {
    if (e.target.parentElement.parentElement.nodeName === 'LI') {
      const $li = e.target.parentElement.parentElement;
      if (e.target.className === 'label') editTodo($li);
    }
  };

  render() {
    this.$todoList.innerHTML = '';
    this.todos.forEach((todo) => {
      new TodoItem(this.$todoList, todo);
    });
  }
}

export default TodoList;
