export const todoListTemplate = todoList => {
  return todoList.map((item, index) => (
    `<li id="${item.id}" class="${item.completed ? 'completed' : ''} ${item.editing ? 'editing' : ''}">
      <div class="view">
        <input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}/>
        <label class="label">${item.text}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${item.text}" />
    </li>`
  )).join('');
}