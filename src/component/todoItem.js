
export function TodoItem(id, contents) {
    this.id = id;
    this.text = contents;
    this.status = "view";

    this.isCompleted = () => {
      if (this.status === "completed") {
        return true;
      }
    }

    this.complete = () => {
      if (this.status === "view") {
        this.status = "completed";
        return;
      }
      this.status = "view";
    }

    this.changeStatus = () => {
      if (this.status === "view") {
        this.status = "editing";
        return;
      }
      if (this.status === "editing") {
        this.status = "view";
        return;
      }
    }

    this.match = matchId => {
      return this.id == matchId;
    }

    this.edit = value => {
      this.text = value;
      this.changeStatus();
    }
  }

export function todoItemTemplate(item) {
    return `<li class=${item.status}>
    <div class="view">
      <input class="toggle" type="checkbox" ${item.status === "completed" ? "checked": ""}/>
      <label class="label">${item.text}</label>
      <button class="destroy"></button>
    </div>
    <input type="hidden" id="item-id" value="${item.id}"/>
    <input class="edit" value="${item.text}" />
  </li>`;
}

export function parseItems(items) {
  if (items === "[]") {
    return [];
  }
  return JSON.parse(items).map(item => {
    return new TodoItem(item.id, item.text);
  });
}


