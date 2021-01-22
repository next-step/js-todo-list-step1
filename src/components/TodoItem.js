class TodoItem {
  constructor(title, index) {
    this.title = title;
    this.index = index;
    this.isCompleted = false;
  }

  static render(itemObject) {
    return `
      <li ${itemObject.isCompleted ? 'class="completed"' : ''} data-index="${itemObject.index}">
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${itemObject.title}</label>
            <button class="destroy"></button>
        </div>
      <input class="edit" value="${itemObject.title}" />
    </li>`;
  }
}

export default TodoItem;
