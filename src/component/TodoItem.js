export function TodoItem(contents) {
  this.contents = contents;
}

export function todoItemTemplate(todoItem) {
  return `
    <li>
    <div class="view">
        <input class="toggle" type="checkbox"/>
        <label class="label">${todoItem.contents}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="${todoItem.contents}" />
    </li>`;
}
