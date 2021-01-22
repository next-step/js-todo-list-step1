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
  this.deleteItem = (event) => {
    const itemEl = event.target.parentElement.parentElement;
    todoApp.deleteItem(itemEl.dataset.id);
    todoApp.todoInput.focus();
  };

  this.render = (items) => {
    listEl.innerHTML = items.map(renderTodoItem).join("");
  };

  listEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("destroy")) {
      return this.deleteItem(event);
    }
  });
}
