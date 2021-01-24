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

  this.toggleCompleted = (targetEl) => {
    const id = getTodoItemId(targetEl);
    const todo = todoApp.getTodo(id);
    todoApp.updateTodo({ ...todo, completed: !todo.completed });
  };

  this.deleteTodo = (targetEl) => {
    const id = getTodoItemId(targetEl);
    todoApp.deleteTodo(id);
  };

  this.convertToEditor = (targetEl) => {
    const id = getTodoItemId(targetEl);
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

  listEl.addEventListener("click", ({ target }) => {
    if (target.classList.contains("toggle")) {
      this.toggleCompleted(target);
      return;
    }

    if (target.classList.contains("destroy")) {
      this.deleteTodo(target);
    }
  });

  listEl.addEventListener("dblclick", ({ target }) => {
    if (target.classList.contains("label")) {
      this.convertToEditor(target);
    }
  });

  listEl.addEventListener("focusout", () => {
    this.convertToViewer();
  });

  listEl.addEventListener("keypress", ({ code, target }) => {
    if (code === "Escape") {
      this.convertToViewer();
      return;
    }

    const value = target.value.trim();
    if (code === "Enter" && value) {
      this.updateValue(value);
      this.convertToViewer();
    }
  });
}
