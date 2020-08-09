import { NODE_NAME, CLASS_NAME, MESSAGE } from '../utils/constant.js';

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
    this.isEditing = false;

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
    if (
      clickedClassName !== CLASS_NAME.TOGGLE &&
      clickedClassName !== CLASS_NAME.DESTROY
    ) {
      return;
    }

    const todoItemId = parseInt(e.target.closest('li').id);

    if (clickedClassName == CLASS_NAME.TOGGLE) {
      onToggleTodo(todoItemId);
      return;
    }

    if (clickedClassName == CLASS_NAME.DESTROY) {
      onRemoveTodo(todoItemId);
      return;
    }
  };

  this.onDblClick = (e) => {
    if (this.isEditing) return;
    if (e.target.nodeName !== NODE_NAME.LABEL) return;

    this.isEditing = true;

    const todoItem = e.target.closest('li');
    todoItem.classList.add(CLASS_NAME.EDITING);

    const inputElem = document.createElement('input');
    inputElem.className = CLASS_NAME.EDIT;
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
          alert(MESSAGE.NO_INPUT_KEYWORD);
          return;
        }
        onEditTodo(parseInt(todoItem.id), editContent);
        this.isEditing = false;
        return;

      case 'Escape':
        todoItem.classList.remove(CLASS_NAME.EDITING);
        todoItem.removeChild(e.target);
        this.isEditing = false;
        return;

      default:
        console.error(`${e.key} : ${MESSAGE.UNDEFINED_KEY}`);
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
      case CLASS_NAME.ALL:
        return todos;

      case CLASS_NAME.ACTIVE:
        return todos.filter(({ isCompleted }) => !isCompleted);

      case CLASS_NAME.COMPLETED:
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
