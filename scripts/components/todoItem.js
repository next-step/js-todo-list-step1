class TodoItem {
  constructor(title) {
    this.title = title;
  }

  render() {
    return `
      <li>
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${this.title}</label>
            <button class="destroy"></button>
        </div>
      <input class="edit" value="${this.title}" />
    </li>`;
  }
}

export default TodoItem;
