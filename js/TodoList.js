const renderTodoItem = ({ id, value, completed }) => `
  <li class="${completed ? "completed" : ""}">
    <div class="view" data-item-id="${id}">
      <input class="toggle" type="checkbox" ${completed ? "checked" : ""}>
      <label class="label">${value}</label>
      <button class="destroy"></button>
    </div>
  </li>
`;

export default function TodoList(listEl, todoApp) {
  this.render = (items) => {
    listEl.innerHTML = items.map(renderTodoItem).join("");
  };
}
