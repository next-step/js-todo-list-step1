function TodoList({ $target, todos }) {
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
    console.log(e.target.nodeName);
  };

  this.createTodoItemHTML = (todo) => {
    return `
    <li id=${todo.id}>
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
    console.log(this.$target);
    this.$target.innerHTML = this.createTodoListHTML(this.todos);
  };

  this.init();
}

export default TodoList;
