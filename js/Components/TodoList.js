function TodoList({ $target, todoListState, onToggleTodo, onRemoveTodo }) {
  this.init = () => {
    this.$target = $target;
    this.state = todoListState;

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
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    let renderTodos = [];
    const { todos, selectedTab } = this.state;

    switch (selectedTab) {
      case 'all':
        renderTodos = todos;
        break;

      case 'active':
        renderTodos = todos.filter(({ isCompleted }) => !isCompleted);
        break;

      case 'completed':
        renderTodos = todos.filter(({ isCompleted }) => isCompleted);
        break;

      default:
        console.error(`TodoList Render Error : 올바르지 않은 Tab 이름입니다.`);
        break;
    }

    this.$target.innerHTML = this.createTodoListHTML(renderTodos);
  };

  this.init();
}

export default TodoList;
