export default function TodoList({
  todoList,
  elementId,
  deleteTodo,
  toggleTodo,
  editTodo,
}) {
  this.init = () => {
    if (!(this instanceof TodoList)) {
      throw new Error(`Invalid function call ${this}`);
    }
    this.todoList = todoList;
    this.$todoList = document.getElementById(elementId);
    this.deleteTodo = deleteTodo;
    this.toggleTodo = toggleTodo;
    this.editTodo = editTodo;
  };
  this.render = () => {
    this.$todoList.innerHTML = `
        ${this.todoList
          .map(
            ({ content, isCompleted, id }) => `
              <li data-id=${id} class=${isCompleted ? "completed" : ""}>
                  <div class="view">
                      <input class="toggle" type="checkbox" ${
                        isCompleted ? "checked" : ""
                      } />
                      <label class="label">${content}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${content}" />
              </li>
            `
          )
          .join("")}
    `;
  };
  this.setState = (todos) => {
    this.todoList = todos;
    this.render();
  };
  this.clickHandler = (evt) => {
    if (
      evt.target.tagName === "INPUT" &&
      evt.target.classList.contains("toggle")
    ) {
      this.toggleTodo({ id: evt.target.parentNode.parentNode.dataset.id });
    }
    if (evt.target.tagName === "BUTTON") {
      this.deleteTodo({ id: evt.target.parentNode.parentNode.dataset.id });
    }
  };
  this.dblClickHandler = (evt) => {
    if (evt.target.tagName === "LABEL") {
      evt.target.parentNode.parentNode.classList.toggle("editing");
      evt.target.parentNode.parentNode.childNodes[3].focus();
    }
  };
  this.keydownHandler = (evt) => {
    if (
      evt.target.tagName === "INPUT" &&
      evt.target.classList.contains("edit") &&
      evt.key === "Escape"
    ) {
      evt.target.parentNode.classList.toggle("editing");
    } else if (evt.key === "Enter") {
      this.editTodo({
        content: evt.target.value,
        id: evt.target.parentNode.dataset.id,
      });
    }
  };
  this.bindEventListener = () => {
    this.$todoList.addEventListener("click", this.clickHandler);
    this.$todoList.addEventListener("dblclick", this.dblClickHandler);
    this.$todoList.addEventListener("keydown", this.keydownHandler);
    this.$todoList.addEventListener("keydown", this.enterHandler);
  };
  this.init();
  this.render();
  this.bindEventListener();
}
