export const TodoItemTemplate = (todoItem) => {
  return `<li id="${todoItem.id}" class="${todoItem.status}">
        <div class="view">
         <input class="toggle" type="checkbox" ${
           todoItem.isCompleted() ? "checked" : ""
         }>
          <label class="label">${todoItem.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${todoItem.content}">
      </li>`;
};

export const TodoCountTemplate = (todoItems) => {
  return `총 <strong>${todoItems.length}</strong> 개`;
};
