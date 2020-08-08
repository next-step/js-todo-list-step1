import { TAB, MESSAGE } from '../utils/constant.js';

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

  this.getSelectedTodos = (selectedTab) => {
    const { todos } = this.state;

    switch (selectedTab) {
      case TAB.ALL:
        return todos;

      case TAB.ACTIVE:
        return todos.filter(({ isCompleted }) => !isCompleted);

      case TAB.COMPLETED:
        return todos.filter(({ isCompleted }) => isCompleted);

      default:
        console.error(`TodoList Render Error : ${MESSAGE.UNDEFINED_TAB}`);
        return;
    }
  };

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    const renderTodos = this.getSelectedTodos(this.state.selectedTab);

    this.$target.innerHTML = this.createTodoListHTML(renderTodos);
  };

  this.init();
}

export default TodoList;
