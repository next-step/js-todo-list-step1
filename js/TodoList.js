const renderTodoItem = ({ id, value, completed }, editingId) => `
  <li class="${
    id === editingId ? "editing" : completed ? "completed" : ""
  }" data-id="${id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${completed ? "checked" : ""}>
      <label class="label">${value}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${value}">
  </li>
`;

export default function TodoList(listEl, todoApp) {
  const getTodoItemId = (childEl) => childEl.closest("li")?.dataset?.id;

  this.toggleCompleted = ({ target }) => {
    if (!target.classList.contains("toggle")) {
      return;
    }

    const id = getTodoItemId(target);
    const todo = todoApp.getTodo(id);
    todoApp.updateTodo({ ...todo, completed: !todo.completed });
  };

  this.deleteTodo = ({ target }) => {
    if (!target.classList.contains("destroy")) {
      return;
    }

    const id = getTodoItemId(target);
    const { value } = todoApp.getTodo(id);
    if (!confirm(`정말로 삭제하시겠습니까?\n\n${value}`)) {
      return;
    }

    todoApp.deleteTodo(id);
  };

  this.convertToEditor = ({ target }) => {
    if (!target.classList.contains("label")) {
      return;
    }

    const id = getTodoItemId(target);
    todoApp.setEditingId(id);
  };

  this.convertToViewer = () => todoApp.setEditingId();

  this.updateValue = ({ code, target }) => {
    if (code !== "Enter") {
      return;
    }

    const value = target.value.trim();
    if (!value) {
      return;
    }

    const todo = todoApp.getTodo(todoApp.editingId);
    todoApp.updateTodo({ ...todo, value });
    this.convertToViewer();
  };

  this.convertToViewerWhenPressingEsc = ({ code }) => {
    if (code !== "Escape") {
      return;
    }

    this.convertToViewer();
  };

  this.render = (todos) => {
    listEl.innerHTML = todos
      .map((todo) => renderTodoItem(todo, todoApp.editingId))
      .join("");

    if (!todoApp.editingId) {
      return;
    }

    listEl.querySelector(`li[data-id="${todoApp.editingId}"] .edit`)?.focus();
  };

  listEl.addEventListener("click", this.toggleCompleted);
  listEl.addEventListener("click", this.deleteTodo);
  listEl.addEventListener("dblclick", this.convertToEditor);
  listEl.addEventListener("focusout", this.convertToViewer);
  listEl.addEventListener("keypress", this.updateValue);
  listEl.addEventListener("keypress", this.convertToViewerWhenPressingEsc);
}
