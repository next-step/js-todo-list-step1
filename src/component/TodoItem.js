export function TodoItem(contents, id, status) {
  this.contents = contents;
  this.id = id;
  this.status = status;
}

TodoItem.prototype.toString = () => {};

export function todoItemRender(todoItem) {
  let html = "";
  html += `
  <li id=${todoItem.id} class=${todoItem.status}>
    <div class="view">
  `;
  if (todoItem.status === "completed") {
    html += `<input class="toggle" type="checkbox" checked/>`;
  } else {
    html += `<input class="toggle" type="checkbox"/>`;
  }
  html += ` 
         <label class="label">${todoItem.contents}</label>
         <button class="destroy"></button>
     </div>
    <input class="edit" value="${todoItem.contents}" />
  </li>
  `;
  return html;
}
