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
    const itemEl = event.target.parentElement.parentElement;
    const item = todoApp.getItem(itemEl.dataset.id);
    todoApp.updateItem({ ...item, completed: !item.completed });
  };

  this.deleteItem = (event) => {
    const itemEl = event.target.parentElement.parentElement;
    todoApp.deleteItem(itemEl.dataset.id);
  };

  this.convertToEditor = (event) => {
    const itemEl = event.target.parentElement.parentElement;
    const { id } = itemEl.dataset;
    todoApp.setEditingId(id);
  };

  this.convertToViewer = () => {
    todoApp.setEditingId();
  };

  this.render = (items) => {
    listEl.innerHTML = items
      .map((item) => renderTodoItem(item, todoApp.editingId))
      .join("");

    if (todoApp.editingId) {
      listEl.querySelector(`li[data-id="${todoApp.editingId}"] .edit`)?.focus();
    }
  };

  listEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle")) {
      this.toggleCompleted(event);
    }
    if (event.target.classList.contains("destroy")) {
      this.deleteItem(event);
    }
  });

  listEl.addEventListener("dblclick", (event) => {
    if (event.target.classList.contains("label")) {
      this.convertToEditor(event);
    }
  });

  listEl.addEventListener("focusout", (event) => {
    this.convertToViewer();
  });
}
