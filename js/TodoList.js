const renderTodoItem = ({ id, value, done }) => `
  <li class="${done ? "completed" : ""}">
    <div class="view" data-item-id="${id}">
      <input class="toggle" type="checkbox" ${done ? "checked" : ""}>
      <label class="label">${value}</label>
      <button class="destroy"></button>
    </div>
  </li>
`;

export default function TodoList(listEl, todoApp) {
  this.render = function (items) {
    listEl.innerHTML = items.map(renderTodoItem).join("");
  };
}
