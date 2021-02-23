export function TodoList($ul, context) {
  this.setState = (updatedTodoItems) => {
    this.render(updatedTodoItems);
  };

  this.complete = (todoItem) => context.complete(todoItem);
  this.delete = (todoItem) => context.delete(todoItem);

  this.update = (id, todoItem) => {
    if (todoItem === null || todoItem === "") {
      alert("빈값이 들어올 순 없습니다");
      return;
    }
    context.update(id, todoItem);
  };

  const onClickEditing = (event) =>
    event.target.closest("li").classList.add("editing");

  const onClickTodoItem = (event) => {
    const className = event.target.classList;

    if (className.contains("toggle")) {
      this.complete(event.target.closest("li").id);
      return;
    }
    if (className.contains("destroy")) {
      this.delete(event.target.closest("li").id);
    }
  };
  const onEdited = (event) => {
    const updatedTodoItem = event.target.value;
    const id = event.target.closest("li").id;

    if (event.key === "Enter") {
      this.update(id, updatedTodoItem);
      event.target.closest("li").classList.remove("editing");
    } else if (event.key === "Escape") {
      event.target.closest("li").classList.remove("editing");
    }
  };

  $ul.addEventListener("click", onClickTodoItem);
  $ul.addEventListener("dblclick", onClickEditing);
  $ul.addEventListener("keyup", onEdited);

  this.render = (items) => {
    $ul.innerHTML = items.map((item) => renderHTML(item)).join("");
  };
}

const renderHTML = (todoItem) => {
  return `<li id=${todoItem.todoItem} class=${
    todoItem.completed ? "completed" : ""
  }>
    <div class="view">
      <input class="toggle" type="checkbox" ${
        todoItem.completed ? "checked" : ""
      }>
      <label class="label">${todoItem.todoItem}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit">
  </li>`;
};
