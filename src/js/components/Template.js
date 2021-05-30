export const TodoItemTemplate = (todoItem) => {
  if (todoItem.isCompleted()) {
    return `<li id="${todoItem.id}" class="${todoItem.status}">
        <div class="view">
          <input class="toggle" type="checkbox" checked>
          <label class="label">${todoItem.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="completed now ${todoItem.content}">
      </li>`;
  } else {
    return `<li id="${todoItem.id}" class="${todoItem.status}">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${todoItem.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${todoItem.content}">
      </li>`;
  }
};

export const TodoCountTemplate = (todoItems) => {
  return `총 <strong>${todoItems.length}</strong> 개`;
};
