
export function TodoItem(id, contents) {
    this.id = id;
    this.text = contents;
    this.completed = false;

    this.changeComplete = () => {
      this.completed = !this.completed;
    }

    this.match = matchId => {
      return this.id == matchId;
    }
  }

export function todoItemTemplate(item) {
    return `<li class=${item.completed ? "completed": "view"}>
    <div class="view">
      <input class="toggle" type="checkbox" ${item.completed ? "checked": ""}/>
      <label class="label">${item.text}</label>
      <button class="destroy"></button>
    </div>
    <input type="hidden" id="item-id" value="${item.id}"/>
    <input class="edit" value="${item.text}" />
  </li>`;
}

export function converter(target) {
  return target.querySelector("#item-id").value;
}


