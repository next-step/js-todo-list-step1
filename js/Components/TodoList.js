function TodoList({ $target, todos, onToggleTodo, onRemoveTodo }) {
  this.init = () => {
    this.$target = $target;
    this.todos = todos;

    this.bindEvents();
    this.render();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
  };

  this.onClick = (e) => {
    const clickedClassName = e.target.className;
    if (clickedClassName !== 'toggle' && clickedClassName !== 'destroy') return;

    const todoItemId = parseInt(e.target.closest('li').id);

    if (clickedClassName == 'toggle') {
      onToggleTodo(todoItemId);
      return;
    }

    if (clickedClassName == 'destroy') {
      onRemoveTodo(todoItemId);
      return;
    }
  };

  this.createTodoItemHTML = (todo) => {
    return `
    <li id=${todo.id} >
      <div class="view">
        <input class="toggle" type="checkbox" 
        ${todo.isCompleted ? 'checked' : ''} 
        />
        <label class="label">${todo.title}</label>
        <button class="destroy"></button>
      </div>
    </li>`;
  };

  this.createTodoListHTML = (todos) => {
    return todos.reduce((html, todo) => {
      html += this.createTodoItemHTML(todo);
      return html;
    }, '');
  };

  this.setState = (nextState) => {
    this.todos = nextState;

    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = this.createTodoListHTML(this.todos);
  };

  this.init();
}

export default TodoList;
