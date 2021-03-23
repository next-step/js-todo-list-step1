export default class TodoItem {
  item;
  onRemove;
  onCheckedToggle;
  onTitleChange;

  constructor(item) {
    this.item = item;
  }

  makeTemplate() {
    const { id, title, isCompleted } = this.item;
    const $li = document.createElement("li");

    if (isCompleted) $li.classList.add("completed");

    $li.innerHTML = `
             <div class="view">
                <input class="toggle" type="checkbox" ${
                  isCompleted ? "checked" : ""
                }/>
                <label class="label">${title}</label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="${title}" />
          `;
    $li.id = id;
    $li.className = "todo-item";

    return $li;
  }

  render() {
    return this.makeTemplate();
  }
}
