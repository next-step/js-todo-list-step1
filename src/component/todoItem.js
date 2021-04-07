
export function TodoItem(id, contents) {
    this.id = id;
    this.text = contents;

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

export function todoInputTemplate(item) {
  return `<div class="view">
  <input
  id="new-todo-title"
  class="new-todo"
  placeholder="${item.text}"
  autofocus
/>
  </div>
  <input class="edit" value="${item.text}" />`;
}

export function converter(target) {
  console.log(target);
  console.log(target.querySelector("#item-id").value);

  return target.querySelector("#item-id").value;
}


