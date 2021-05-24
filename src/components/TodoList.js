export default class TodoList {
  $target = null;
  $todoList = null;
  $todoItems = null;

  constructor($target, $todoItems) {
    this.$target = $target;
    const TodoList = document.createElement("ul");
    this.$todoList = TodoList;

    this.$todoList.id = "todo-list";
    this.$todoList.classList.add("todo-list");

    this.$todoItems = $todoItems;

    this.$target.appendChild(this.$todoList);
    this.render();
  }

  setState(nextState) {
    this.$todoItems = nextState;
    this.render();
  }

  render() {
    this.$todoList.innerHTML = `
        ${this.$todoItems
          .map((todoItem) => {
            return `
            <li id="${todoItem.id}" class="false">
                <div class="view">
                    <input class="toggle" type="checkbox" id="${todoItem.id}" checked=${todoItem.checked}>
                    <label class="label">${todoItem.content}</label>
                    <button class="destroy" id="${todoItem.id}"></button>
                </div>
                <input class="edit" value="${todoItem.content}">
            </li>
            `;
          })
          .join("")}
      `;
  }
}
