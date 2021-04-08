
export function TodoItem(id, contents) {
    this.id = id;
    this.text = contents;
    this.completed = false;

    this.changeComplete = () => {
      this.completed = !this.completed;
    }
    function match(matchId) {
      if (this.id === matchId) {
        return true;
      }
      return false;
    }

  }

export function todoItemTemplate(item) {
    return `<li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
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


