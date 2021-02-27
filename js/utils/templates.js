export const todoItemTemplate = (data) =>
  `<li data-id="${data.id}" class="todo-item ${data.isDone ? "completed" : ""}">
    <div class="view">
      <input class="toggle" type="checkbox" ${data.isDone ? "checked" : ""}/>
      <label class="label">${data.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${data.title}" />
  </li>`;
