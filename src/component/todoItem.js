
export function TodoItem(contents) {
    this.text = contents;
  }

export function todoItemTemplate(item) {
    return "<li>" +
    '<div class="view">' +
      '<input class="toggle" type="checkbox"/>' +
      '<label class="label">' + 
      item.text +
      '</label>' +
      '<button class="destroy"></button>' +
    '</div>' +
    '<input class="edit" value="' +
    item.text+
    '" />' +
  "</li>";
}

export function converter(target) {
  return new TodoItem(target.querySelector("label").text);
}


