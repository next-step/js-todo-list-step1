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
  this.toggleCompleted = (event) => {
    const itemEl = event.target.closest("li");
    const todo = todoApp.getTodo(itemEl.dataset.id);
    todoApp.updateTodo({ ...todo, completed: !todo.completed });
  };

  this.deleteTodo = (event) => {
    const itemEl = event.target.closest("li");
    todoApp.deleteTodo(itemEl.dataset.id);
  };

  this.convertToEditor = (event) => {
    const itemEl = event.target.parentElement.parentElement;
    const { id } = itemEl.dataset;
    todoApp.setEditingId(id);
  };

  this.convertToViewer = () => {
    todoApp.setEditingId();
  };

  this.updateValue = (value) => {
    const todo = todoApp.getTodo(todoApp.editingId);
    todoApp.updateTodo({ ...todo, value });
  };

  this.render = (todos) => {
    listEl.innerHTML = todos
      .map((todo) => renderTodoItem(todo, todoApp.editingId))
      .join("");

    if (todoApp.editingId) {
      listEl.querySelector(`li[data-id="${todoApp.editingId}"] .edit`)?.focus();
    }
  };

  listEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle")) {
      this.toggleCompleted(event);
      return;
    }

    if (event.target.classList.contains("destroy")) {
      this.deleteTodo(event);
    }
  });

  listEl.addEventListener("dblclick", (event) => {
    if (event.target.classList.contains("label")) {
      this.convertToEditor(event);
    }
  });

  listEl.addEventListener("focusout", () => {
    this.convertToViewer();
  });

  listEl.addEventListener("keypress", (event) => {
    if (event.code === "Escape") {
      this.convertToViewer();
      return;
    }

    const value = event.target.value.trim();
    if (event.code === "Enter" && value) {
      this.updateValue(value);
      this.convertToViewer();
    }
  });
}
