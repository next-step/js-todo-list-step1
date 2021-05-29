export default class TodoList {
  constructor(target) {
    this.$target = target;
  }

  render(todoListState) {
    const todoItemTemplate = todoListState.map(this._getTodoItemTemplate);
    this.$target.innerHTML = todoItemTemplate.join('');
  }

  _getTodoItemTemplate({ id, value, isDone }) {
    return `
    <li id="${id}" class="${isDone && 'completed'}">
      <div class="view">
        <input id="${id}" class="toggle" type="checkbox" ${isDone && 'checked'}/>
        <label class="label">${value}</label>
        <button id="${id}" class="destroy"></button>
      </div>
      <input class="edit" value=${value} />
    </li>
  `;
  }
}
