class TodoItem {
  constructor(title, index) {
    this.title = title;
    this.index = index;
    this.status = 1; // 1 - active / 0 - completed
  }

  render() {
    return `
      <li ${this.status === 0 ? 'class="completed' : ''}>
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
