const renderTodoItem = ({ id, value, completed }) => `
  <li class="${completed ? "completed" : ""}" data-id="${id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${completed ? "checked" : ""}>
      <label class="label">${value}</label>
      <button class="destroy"></button>
    </div>
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

  this.render = (items) => {
    listEl.innerHTML = items.map(renderTodoItem).join("");
  };

  listEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle")) {
      this.toggleCompleted(event);
    }
    if (event.target.classList.contains("destroy")) {
      this.deleteItem(event);
    }
    todoApp.todoInput.focus();
  });
}
