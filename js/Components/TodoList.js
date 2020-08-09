import { TAB, MESSAGE } from '../utils/constant.js';

function TodoList({
  $target,
  todoListState,
  onToggleTodo,
  onRemoveTodo,
  onEditTodo,
}) {
  this.init = () => {
    this.$target = $target;
    this.state = todoListState;

    this.bindEvents();
    this.render();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
    this.$target.addEventListener('dblclick', this.onDblClick);
    this.$target.addEventListener('keydown', this.onKeypress);
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

  this.onDblClick = (e) => {
    if (e.target.nodeName !== 'LABEL') return;

    const todoItem = e.target.closest('li');
    todoItem.classList.add('editing');

    const inputElem = document.createElement('input');
    inputElem.className = 'edit';
    inputElem.value = e.target.innerText;
    todoItem.appendChild(inputElem);
    inputElem.focus();
  };

  this.onKeypress = (e) => {
    const key = e.key;
    if (key !== 'Enter' && key != 'Escape') return;

    const todoItem = e.target.closest('li');
    const editContent = e.target.value.trim();

    switch (key) {
      case 'Enter':
        if (!editContent.length) {
          alert('할 일을 입력해주세요');
          return;
        }
        onEditTodo(parseInt(todoItem.id), editContent);
        return;

      case 'Escape':
        todoItem.classList.remove('editing');
        todoItem.removeChild(e.target);
        return;

      default:
        console.error(`${e.key} : 등록되지 않은 KEY 입력입니다.`);
        break;
    }
  };

  this.createTodoItemHTML = (todo) => {
    return `
    <li id=${todo.id} class=${todo.isCompleted ? 'completed' : ''}>
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
