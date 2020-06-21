export const todoListTemplate = todoList => {
  return todoList.map((item, index) => (
    `<li data-id="${index}" class="${item.completed ? 'completed' : ''}">
      <div class="view">
        <input class="toggle" type="checkbox" id="${index}" ${item.completed ? 'checked' : ''}/>
        <label class="label" for="${index}">${item.text}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="완료된 타이틀" />
    </li>`
  )).join('');
}