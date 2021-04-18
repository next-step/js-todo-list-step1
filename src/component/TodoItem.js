export function TodoItem(contents, id) {
  this.contents = contents;
  this.id = id;
}

export function todoItemTemplate(todoItem) {
  return `
    <li id=${todoItem.id}>
      <div class="view">
          <input class="toggle" type="checkbox"/>
          <label class="label">${todoItem.contents}</label>
          <button class="destroy"></button>
      </div>
      <input class="edit" value="${todoItem.contents}" />
    </li>
    `;
}
