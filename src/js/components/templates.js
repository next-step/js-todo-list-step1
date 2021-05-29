
export const todoItemTemplate = (item) => {
  if (item.todo === "") return null;
  
  return `
  <li class=${item.editing ? "editing" : item.completed ? "complted" : null } id="${item.id}"}>
    <div class="view">
      <input class="toggle" type="checkbox" ${item.completed ? "checked": null}/>
      <label class="label">${item.todo}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.todo}" />
  </li>
  `;
};